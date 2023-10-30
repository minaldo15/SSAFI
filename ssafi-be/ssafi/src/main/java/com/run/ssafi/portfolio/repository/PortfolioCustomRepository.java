package com.run.ssafi.portfolio.repository;

import com.run.ssafi.domain.Portfolio;
import com.run.ssafi.portfolio.vo.PortfolioVo;
import java.util.List;


public interface PortfolioCustomRepository {
    PortfolioVo findByType(String type);

    List<Portfolio> findByPortType(String portType);

    void deletePortfolio();
}
