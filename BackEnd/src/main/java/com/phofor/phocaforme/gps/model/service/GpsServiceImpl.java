package com.phofor.phocaforme.gps.model.service;

import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;

@Service
@Slf4j
public class GpsServiceImpl implements GpsService {

    @Override
    public String getAddress(MemberDto memberDto) throws Exception {
        JSONObject jObj = convertAddress(memberDto.getLongitude(), memberDto.getLatitude());

        JSONObject meta = (JSONObject) jObj.get("meta");
        int size = (int) meta.get("total_count");
        String s = "주소를 불러올 수 없습니다.";
        if (size > 0) {
            JSONArray jArray = (JSONArray) jObj.get("documents");
            JSONObject subJobj = (JSONObject) jArray.get(0);

            if(subJobj.get("address") != null){ // 지번 주소
                JSONObject address = (JSONObject) subJobj.get("address");
                s = (String) address.get("address_name");
            } else if(subJobj.get("road_address")!=null) { // 도로명 주소
                JSONObject road_address = (JSONObject) subJobj.get("road_address");
                s = (String) road_address.get("address_name");
            }
        }
        return s;
    }

    public static JSONObject convertAddress(double x, double y) {
        String apiurl = "https://dapi.kakao.com/v2/local/geo/coord2address.json?x=" + x + "&y=" + y + "&input_coord=WGS84";
        String REST_KEY = "9d6851e5b7f49089fd6347a19abbcc09";
        BufferedReader br = null;
        JSONObject obj = null;

        try {
            URL url = new URL(apiurl);
            URLConnection conn = url.openConnection();
            conn.setRequestProperty("Authorization", "KakaoAK " + REST_KEY);
            br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            obj = new JSONObject(br.readLine());
        } catch (Exception e) {
            log.error("에러 발생", e);
            e.printStackTrace();
        }

        return obj;
    }
}