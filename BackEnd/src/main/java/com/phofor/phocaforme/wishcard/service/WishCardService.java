package com.phofor.phocaforme.wishcard.service;

import com.phofor.phocaforme.wishcard.dto.WishCardInfoDto;
import com.phofor.phocaforme.wishcard.dto.WishDocument;
import com.phofor.phocaforme.wishcard.dto.response.WishCardResponseDto;

public interface WishCardService {
    public Boolean registWishCardByUserId(String userId, WishCardInfoDto wishCardInfoDto);

    public WishCardResponseDto loadWishCardByUserId(String userId);

    public Boolean deleteWishCardByUserId(String userId);

    public WishDocument findWishCardByUserId(String userId);

}
