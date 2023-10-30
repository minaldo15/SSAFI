package com.run.ssafi.portfolio.service;

import com.run.ssafi.ai.repository.AiRepository;
import com.run.ssafi.config.auth.MemberDetail;
import com.run.ssafi.domain.AiTrade;
import com.run.ssafi.domain.Kospi;
import com.run.ssafi.domain.Member;
import com.run.ssafi.domain.Portfolio;
import com.run.ssafi.domain.Score;
import com.run.ssafi.domain.Type;
import com.run.ssafi.member.repository.ScoreRepository;
import com.run.ssafi.message.custom_message.PortfolioMessage;
import com.run.ssafi.portfolio.dto.PortfolioResponseDto;
import com.run.ssafi.portfolio.repository.PortfolioRepository;
import com.run.ssafi.portfolio.vo.PortfolioVo;
import com.run.ssafi.stock.repository.KospiRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
public class PortfolioServiceImpl implements PortfolioService{
    private final AiRepository aiRepository;
    private final ScoreRepository scoreRepository;
    private final PortfolioRepository portfolioRepository;
    private final KospiRepository kospiRepository;

    @Override
    public PortfolioResponseDto getPortfolio(MemberDetail memberDetail) {
        Member member = memberDetail.getMember();
        Score score = scoreRepository.findById(member.getId()).orElse(null);
        AiTrade aiTrade = aiRepository.findById(member.getId()).orElse(null);

        Double riskRatio = null;
        Double neutralRatio = null;
        Double safetyRatio = null;

        Type type = member.getType();
        String investmentType = null;


        if(aiTrade != null){
            riskRatio = aiTrade.getRiskRatio();
            neutralRatio = aiTrade.getNeutralRatio();
            safetyRatio = aiTrade.getSafetyRatio();

            if(riskRatio>neutralRatio && riskRatio>safetyRatio){
                investmentType = "risk";
            } else if (neutralRatio > safetyRatio) {
                investmentType = "neutral";
            } else {
                investmentType = "safe";
            }
        } else if (type != null){
            switch (type) {
                case APML :
                    investmentType = "risk";
                    riskRatio = 50.0;
                    neutralRatio = 30.0;
                    safetyRatio = 20.0;
                    break;
                case APMC :
                    investmentType = "risk";
                    riskRatio = 50.0;
                    neutralRatio = 30.0;
                    safetyRatio = 20.0;
                    break;
                case APWL :
                    investmentType = "neutral";
                    riskRatio = 50.0;
                    neutralRatio = 30.0;
                    safetyRatio = 20.0;
                    break;
                case APWC :
                    investmentType = "safe";
                    riskRatio = 50.0;
                    neutralRatio = 30.0;
                    safetyRatio = 20.0;
                    break;
                case ABML :
                    investmentType = "risk";
                    riskRatio = 50.0;
                    neutralRatio = 30.0;
                    safetyRatio = 20.0;
                    break;
                case ABMC :
                    investmentType = "risk";
                    riskRatio = 50.0;
                    neutralRatio = 30.0;
                    safetyRatio = 20.0;
                    break;
                case ABWL :
                    investmentType = "risk";
                    riskRatio = 50.0;
                    neutralRatio = 30.0;
                    safetyRatio = 20.0;
                    break;
                case ABWC :
                    investmentType = "neutral";
                    riskRatio = 50.0;
                    neutralRatio = 30.0;
                    safetyRatio = 20.0;
                    break;
                case IPML :
                    investmentType = "risk";
                    riskRatio = 50.0;
                    neutralRatio = 30.0;
                    safetyRatio = 20.0;
                    break;
                case IPMC :
                    investmentType = "risk";
                    riskRatio = 50.0;
                    neutralRatio = 30.0;
                    safetyRatio = 20.0;
                    break;
                case IPWL :
                    investmentType = "neutral";
                    riskRatio = 50.0;
                    neutralRatio = 30.0;
                    safetyRatio = 20.0;
                    break;
                case IPWC :
                    investmentType = "safe";
                    riskRatio = 50.0;
                    neutralRatio = 30.0;
                    safetyRatio = 20.0;
                    break;
                case IBML :
                    investmentType = "risk";
                    riskRatio = 50.0;
                    neutralRatio = 30.0;
                    safetyRatio = 20.0;
                    break;
                case IBMC :
                    investmentType = "risk";
                    riskRatio = 50.0;
                    neutralRatio = 30.0;
                    safetyRatio = 20.0;
                    break;
                case IBWL :
                    investmentType = "neutral";
                    riskRatio = 50.0;
                    neutralRatio = 30.0;
                    safetyRatio = 20.0;
                    break;
                case IBWC :
                    investmentType = "safe";
                    riskRatio = 50.0;
                    neutralRatio = 30.0;
                    safetyRatio = 20.0;
                    break;
            };
        }

        PortfolioVo portfolioVo = portfolioRepository.findByType(investmentType);

        PortfolioResponseDto portfolioResponseDto = new PortfolioResponseDto();

        if(member.getType() != null){
            portfolioResponseDto.setType(member.getType());
        }

        if(portfolioVo != null){
            portfolioResponseDto.setRecommendedStock(portfolioVo.getRecommendedStock());
        }

        if (score != null) {
            portfolioResponseDto.setAiScore(score.getAiScore());
            portfolioResponseDto.setPbScore(score.getPbScore());
            portfolioResponseDto.setMwScore(score.getMwScore());
            portfolioResponseDto.setLcScore(score.getLcScore());
        }

        portfolioResponseDto.setRiskRatio(riskRatio);
        portfolioResponseDto.setNeutralRatio(neutralRatio);
        portfolioResponseDto.setSafetyRatio(safetyRatio);

        portfolioResponseDto.setMessage(PortfolioMessage.PORTFOLIO_LOADING_SUCCESS.getMessage());

        return portfolioResponseDto;
    }

    @Override
    public void createPortfolio(){

        List<Kospi> kospiList = kospiRepository.findTop3Kospi();
        System.out.println(kospiList.toString());

        portfolioRepository.deletePortfolio();

        for (Kospi kospi : kospiList) {
            portfolioRepository.save(
                    Portfolio.builder()
                            .portType(kospi.getKospiType())
                            .kospi(kospi)
                            .build()
            );
        }
    }
}
