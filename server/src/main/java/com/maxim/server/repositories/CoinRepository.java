package com.maxim.server.repositories;

import com.maxim.server.models.Coin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoinRepository extends JpaRepository<Coin, Long> {
    Coin findBySymbol(String symbol);
}
