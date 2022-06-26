package com.roman.romanpalpal.Repository;

import com.roman.romanpalpal.Dto.DressModelDTO;
import com.roman.romanpalpal.Entity.DressModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface DressModelRepository extends JpaRepository<DressModel, Long> {
    @Query("select new com.roman.romanpalpal.Dto.DressModelDTO(d.modelNo, d.modelName, d.modelPrice, d.modelColor, d.modelSize, d.modelSizeSummary) from DressModel d")
    List<DressModelDTO> getDressModel();
}
