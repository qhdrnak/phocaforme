package com.phofor.phocaforme.auth.repository;

import com.phofor.phocaforme.auth.entity.UserDeviceEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserDeviceRepository extends CrudRepository<UserDeviceEntity, String> {
    Optional<UserDeviceEntity> findByUserId(String userId);
}
