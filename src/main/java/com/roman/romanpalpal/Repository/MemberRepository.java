package com.roman.romanpalpal.Repository;

import com.roman.romanpalpal.Entity.Member;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByMemberId(String id);
    boolean existsByMemberId(String id);

    @Transactional
    @Modifying
    @Query("update Member m set " +
            "m.memberName = :memberName, " +
            "m.address = :address, " +
            "m.postcode = :postcode, " +
            "m.phoneNumber = :phoneNumber, " +
            "m.email = :email " +
            "where m.memberId = :memberId")
    int memberInfoModify(@Param("memberId") String memberId,
                         @Param("memberName") String memberName,
                         @Param("address") String address,
                         @Param("postcode") String postcode,
                         @Param("phoneNumber") String phoneNumber,
                         @Param("email") String email
    );
}
