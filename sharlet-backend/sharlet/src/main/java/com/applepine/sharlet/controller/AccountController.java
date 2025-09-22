package com.applepine.microwms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
// import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import com.applepine.microwms.entity.Account;
import com.applepine.microwms.service.AccountService;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/users")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @GetMapping
    public ResponseEntity<List<Account>> getAllAccounts(){
        List<Account> accounts = accountService.getAllUserInfo();
        return ResponseEntity.ok(accounts);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity<Account> getAccount(@PathVariable("member-id") int member_id){
        // List<Account> accounts = accountService.getAllUserInfo();
        // return ResponseEntity.ok(accounts);
        Account account = accountService.getAccount(member_id);
        // return ResponseEntity.ok("Good");
        return ResponseEntity.ok(account);
    }

    @PostMapping
    public String addAccount(@RequestParam String param) {
        return new String();
    }

    // @GetMapping("/user-info")
    // public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal){
    //     return principal.getAttributes();
    // }
    
}