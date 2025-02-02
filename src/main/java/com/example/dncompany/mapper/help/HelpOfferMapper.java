package com.example.dncompany.mapper.help;

import com.example.dncompany.dto.help.HelpOfferListDTO;
import com.example.dncompany.dto.help.HelpOfferResponseDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface HelpOfferMapper {
    // 도움 신청 완료
    void insertHelpOffer(HelpOfferListDTO helpOfferListDTO);

    boolean isMePostTest(@Param("helpId") Long helpId, @Param("usersId") Long usersId);

}
