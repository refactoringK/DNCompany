package com.example.dncompany.mapper.dn;

import com.example.dncompany.dto.dn.ProductDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface DnProductMapper {
    void insertProduct(ProductDTO productDTO);
}