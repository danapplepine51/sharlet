package com.applepine.microwms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.applepine.microwms.entity.Account;
import com.applepine.microwms.repository.AccountRepo;

import java.util.List;
import java.util.Optional;

/**
 * Service layer is where all the business logic lies
 */
@Service
public class AccountService {

    @Autowired
    private AccountRepo accountRepo;

    public List<Account> getAllUserInfo(){
        return accountRepo.findAll();
    }

    public Account getAccount(int id){
        // return accountRepo.getReferenceById(id);
        Optional<Account> oAccount = accountRepo.findById(id);
        if(oAccount.isPresent()){
            // return accountRepo.findById(id).get();
        }
        return accountRepo.findById(id).get();        
    }
}
