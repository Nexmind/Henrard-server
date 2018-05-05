package com.nexmind.mycv.repository;

import com.nexmind.mycv.domain.Developer;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Developer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DeveloperRepository extends JpaRepository<Developer, Long> {
    @Query("select distinct developer from Developer developer left join fetch developer.languages")
    List<Developer> findAllWithEagerRelationships();

    @Query("select developer from Developer developer left join fetch developer.languages left join fetch developer.skills where developer.id =:id")
    Developer findOneWithEagerRelationships(@Param("id") Long id);

}
