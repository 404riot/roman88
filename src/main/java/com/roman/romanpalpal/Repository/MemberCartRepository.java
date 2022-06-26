package com.roman.romanpalpal.Repository;

import com.roman.romanpalpal.Dto.MemberCartResponseDTO;
import com.roman.romanpalpal.Entity.MemberCart;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface MemberCartRepository extends JpaRepository<MemberCart, Long> {

    @Query("select new com.roman.romanpalpal.Dto.MemberCartResponseDTO(m.seq, m.orderMemberId, m.orderProductColor, m.orderProductPsc, m.orderProductSize, m.orderProductNo, m.orderProductName, m.orderProductPrice, m.orderPrice) from MemberCart m where m.useFlag = 'Y' and m.orderMemberId = :memberId order by m.orderDate asc")
    List<MemberCartResponseDTO> getMemberCart(String memberId);

    @Transactional
    @Modifying
    @Query("update MemberCart m set m.useFlag = 'N' where m.seq = :seq")
    int removeMemberCart(@Param("seq") int seq);
}
