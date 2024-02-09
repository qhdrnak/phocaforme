package com.phofor.phocaforme.gps.controller;


import com.phofor.phocaforme.gps.dto.GpsLocationDto;
import com.phofor.phocaforme.gps.service.GpsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/gps")
@Slf4j
public class GpsController {
    private final GpsService gpsService;

    @Autowired
    public GpsController(GpsService gpsService) {
        this.gpsService = gpsService;
    }

    @PostMapping
    public ResponseEntity<?> findAddress (@RequestBody GpsLocationDto gpsLocationDto){
        log.info("longitude - {}", gpsLocationDto.getLongitude());
        log.info("latitude - {}", gpsLocationDto.getLatitude());

        String gps;
        HttpStatus status;
        try {
            gps = gpsService.getAddress(gpsLocationDto);
            status = HttpStatus.ACCEPTED;
        } catch (Exception e) {
            gps = "잘못된 주소 정보 입니다.";
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(gps, status);
    }
}