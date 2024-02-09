package com.phofor.phocaforme.gps.service;

import com.phofor.phocaforme.gps.dto.GpsLocationDto;

public interface GpsService {
    String getAddress(GpsLocationDto gpsLocationDto) throws Exception;
}
