package com.applepine.microwms.dto;

import lombok.Getter;
// import lombok.Setter;
import lombok.Builder;
import lombok.NoArgsConstructor;

import com.applepine.microwms.entity.Account;

@Getter
@NoArgsConstructor
public class RequestSaveAccountDTO {
    private int id;
    private String first_name;
    private String last_name;
    private String email;
    private String password;
    private String atype;

    @Builder
    public RequestSaveAccountDTO(int id, String first_name, String last_name, String email, String password, String atype){
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.atype = atype;
    }

    // DTO -> Entity
    public Account toEntity(){
        return Account.builder()
                    .id(id)
                    .first_name(first_name)
                    .last_name(last_name)
                    .email(email)
                    .password(password)
                    .atype(atype)
                    .build();
    }
}
