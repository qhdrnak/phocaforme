package com.phofor.phocaforme.wishcard.service;

import com.phofor.phocaforme.wishcard.dto.WishCardInfoDto;
import com.phofor.phocaforme.wishcard.dto.WishDocument;

public interface WishCardService {
    public Boolean registWishCardByUserId(String userId, WishCardInfoDto wishCardInfoDto);

    public Boolean deleteWishCardByUserId(String userId);

    public WishDocument findWishCardByUserId(String userId);

}
