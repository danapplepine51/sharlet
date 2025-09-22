package com.applepine.microwms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.applepine.microwms.entity.Account;

/**
 * Repository is an interface that provides access to data in a database
 */

public interface AccountRepo extends JpaRepository<Account, Integer> {

}