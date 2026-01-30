package com.vidyasampadana.kcet_updates.controller;

import com.vidyasampadana.kcet_updates.services.KcetServices;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/kcetupdates")
@RequiredArgsConstructor
public class KcetAdminController {

    @Autowired
    private final KcetServices kcetServices;


}
