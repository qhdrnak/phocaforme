package com.phofor.phocaforme.gps.controller;


import com.ssafy.phofo.gps.model.service.GpsService;
import com.ssafy.phofo.gps.model.service.MemberDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/gps")
@Slf4j
public class GpsController {
    private final GpsService gpsService;

    @Autowired
    public GpsController(GpsService gpsService) {
        this.gpsService = gpsService;
    }

    @GetMapping
    public ResponseEntity<?> findGps (@RequestBody MemberDto memberDto){
        log.info("longitude - {}", memberDto.getLongitude());
        log.info("latitude - {}", memberDto.getLatitude());

        String gps;
        try {
            gps = gpsService.getAddress(memberDto);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return new ResponseEntity<String>(gps, HttpStatus.OK);
    }
}