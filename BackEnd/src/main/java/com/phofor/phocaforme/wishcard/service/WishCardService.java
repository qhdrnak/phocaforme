package com.phofor.phocaforme.wishcard.service;

import com.phofor.phocaforme.wishcard.dto.WishCardInfoDto;

public interface WishCardService {
    public Boolean registWishCardByUserId(String userId, WishCardInfoDto wishCardInfoDto);

}
