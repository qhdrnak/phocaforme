package com.phofor.phocaforme.board.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.phofor.phocaforme.auth.entity.UserEntity;
import com.phofor.phocaforme.board.dto.BarterDetailDto;
import com.phofor.phocaforme.board.dto.BarterRegisterDto;
import com.phofor.phocaforme.board.dto.BarterUpdateDto;
import com.phofor.phocaforme.board.entity.Barter;
import com.phofor.phocaforme.board.entity.BarterFindIdol;
import com.phofor.phocaforme.board.entity.BarterImage;
import com.phofor.phocaforme.board.entity.BarterOwnIdol;
import com.phofor.phocaforme.board.repository.*;
import com.phofor.phocaforme.common.entity.IdolMember;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BarterService {

    private final BarterRepository barterRepository;
    private final BarterImageRepository barterImageRepository;
    private final BarterOwnIdolRepository barterOwnIdolRepository;
    private final BarterFindIdolRepository barterFindIdolRepository;
    private final IdolMemberRepository idolMemberRepository;

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.s3.base-url}")
    private String baseUrl;

//    public Page<BarterThumbnailDto> findAll(Pageable pageable){
//        Page<Barter> barters = barterRepository.findAll(pageable);
//        Page<BarterThumbnailDto> thumbnails = new Page<BarterThumbnailDto>();
//        for(Barter barter : barters) {
//            thumbnails.add(BarterThumbnailDto.of(barter));
//        }
//        return thumbnails;
//    }

    // 상세게시물 보기
    public BarterDetailDto findOne(Long barterId){
        Barter barter = barterRepository.findById(barterId)
                .orElseThrow(IllegalArgumentException::new);
        return BarterDetailDto.of(barter);
    }

    // 교환게시글 등록
    public Barter registerBarter(BarterRegisterDto registerDto, UserEntity userEntity) throws IOException {
        Barter barter = Barter.builder()
                .userEntity(userEntity)
                .nickname(userEntity.getNickname())
                .title(registerDto.getTitle())
                .content(registerDto.getContent())
                .cardType((registerDto.getCardType()))
                .build();
        Barter savedBarter = barterRepository.save(barter);
        
        // 아이돌 멤버 테이블에서 찾는 멤버, 소유 멤버 정보들 가져오기
        List<IdolMember> ownIdols = idolMemberRepository.findAllById(registerDto.getOwnIdolMembers());
        List<IdolMember> findIdols = idolMemberRepository.findAllById(registerDto.getFindIdolMembers());

        for(IdolMember ownIdol : ownIdols){
            BarterOwnIdol barterOwnIdol = BarterOwnIdol.builder()
                    .idolMember(ownIdol)
                    .barter(savedBarter)
                    .build();
            barterOwnIdolRepository.save(barterOwnIdol);
        }

        for(IdolMember findIdol : findIdols){
            BarterFindIdol barterFindIdol = BarterFindIdol.builder()
                    .idolMember(findIdol)
                    .barter(savedBarter)
                    .build();
            barterFindIdolRepository.save(barterFindIdol);
        }

        // 다중사진들 저장하기
        List<MultipartFile> photos = registerDto.getPhotos();
        for(MultipartFile photo : photos){
            // AW3 S3에 사진 올리기
            String fileName = "barter/" + UUID.randomUUID() + photo.getOriginalFilename();
            String fileUrl = baseUrl + fileName;
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(photo.getContentType());
            metadata.setContentLength(photo.getSize());

            PutObjectRequest putObjectRequest = new PutObjectRequest(
                    bucket, fileName, photo.getInputStream(), metadata
            );
            putObjectRequest.withCannedAcl(CannedAccessControlList.PublicRead);
            amazonS3Client.putObject(putObjectRequest);

            // 교환게시글 사진테이블에 사진 저장하기
            BarterImage barterImage = BarterImage.builder()
                    .imgCode(fileName)
                    .barter(savedBarter)
                    .build();
            barterImageRepository.save(barterImage);
        }

        return savedBarter;
    }

    // 교환게시글 수정하기
    public void update(UserEntity user, Long barterId, BarterUpdateDto updateDto) throws IOException {
        Barter barter = barterRepository.findById(barterId)
                .orElseThrow(IllegalArgumentException::new);

        // 일정 부분을 찾아 수정하는 것보다 전부 다 지워주고 다시 올려주는 방식을 선택
        deleteAll(barter);

        barter.update(user, user.getNickname(), updateDto.getTitle(), updateDto.getContent(), updateDto.getCardType());

        // register 방법과 똑같음
        List<IdolMember> newOwnIdols = idolMemberRepository.findAllById(updateDto.getOwnIdolMembers());
        List<IdolMember> newFindIdols = idolMemberRepository.findAllById(updateDto.getFindIdolMembers());

        for(IdolMember ownIdol : newOwnIdols){
            BarterOwnIdol barterOwnIdol = BarterOwnIdol.builder()
                    .idolMember(ownIdol)
                    .barter(barter)
                    .build();
            barterOwnIdolRepository.save(barterOwnIdol);
        }

        for(IdolMember findIdol : newFindIdols){
            BarterFindIdol barterFindIdol = BarterFindIdol.builder()
                    .idolMember(findIdol)
                    .barter(barter)
                    .build();
            barterFindIdolRepository.save(barterFindIdol);
        }

        List<MultipartFile> photos = updateDto.getPhotos();
        for(MultipartFile photo : photos){
            String fileName = "barter/" + UUID.randomUUID() + photo.getOriginalFilename();
            String fileUrl = baseUrl + fileName;
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(photo.getContentType());
            metadata.setContentLength(photo.getSize());

            PutObjectRequest putObjectRequest = new PutObjectRequest(
                    bucket, fileName, photo.getInputStream(), metadata
            );
            putObjectRequest.withCannedAcl(CannedAccessControlList.PublicRead);
            amazonS3Client.putObject(putObjectRequest);

            BarterImage barterImage = BarterImage.builder()
                    .imgCode(fileName)
                    .barter(barter)
                    .build();
            barterImageRepository.save(barterImage);
        }
    }

    // 교환게시글 삭제하기
    public void delete(Long barterId){
        Barter barter = barterRepository.findById(barterId)
                .orElseThrow(IllegalArgumentException::new);
        deleteAll(barter);
        barterRepository.deleteById(barterId);
    }

    // 교환게시글 관련 테이블 정보 다 삭제하기
    private void deleteAll(Barter barter){
        List<BarterFindIdol> findIdols = barter.getFindIdols();
        barterFindIdolRepository.deleteAllById(barter
                .getFindIdols()
                .stream()
                .map(BarterFindIdol::getId)
                .collect(Collectors.toList()));

//        List<Long> result = new ArrayList<>();
//        for (BarterFindIdol idol: findIdols) {
//            result.add(idol.getId());
//        }

        List<BarterOwnIdol> ownIdols = barter.getOwnIdols();
        barterOwnIdolRepository.deleteAllById(barter
                .getOwnIdols()
                .stream()
                .map(BarterOwnIdol::getId)
                .collect(Collectors.toList()));

        List<BarterImage> images = barter.getImages();
        barterImageRepository.deleteAllById(barter
                .getImages()
                .stream()
                .map(BarterImage::getId)
                .collect(Collectors.toList()));

        for (BarterImage image: images) {
            String fileName = image.getImgCode();
            amazonS3Client.deleteObject(new DeleteObjectRequest(bucket, fileName));
        }
    }
}