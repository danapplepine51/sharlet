package com.applepine.microwms.dto;

import lombok.Getter;
// import lombok.Setter;
import lombok.NoArgsConstructor;

import com.applepine.microwms.entity.Account;

@Getter
@NoArgsConstructor
public class ResponseAccountDTO {
    private int id;
    private String first_name;
    private String last_name;
    private String email;
    private String password;
    private String atype;

    // Entity -> DTO
    public ResponseAccountDTO(Account account){
        this.id = account.getId();
        this.first_name = account.getFirst_name();
        this.last_name = account.getLast_name();
        this.email = account.getEmail();
        this.password = account.getPassword();
        this.atype = account.getAtype();
    }
}
