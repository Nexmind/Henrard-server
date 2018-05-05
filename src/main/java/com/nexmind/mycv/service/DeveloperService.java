package com.nexmind.mycv.service;

import com.nexmind.mycv.domain.Developer;
import java.util.List;

/**
 * Service Interface for managing Developer.
 */
public interface DeveloperService {

    /**
     * Save a developer.
     *
     * @param developer the entity to save
     * @return the persisted entity
     */
    Developer save(Developer developer);

    /**
     * Get all the developers.
     *
     * @return the list of entities
     */
    List<Developer> findAll();

    /**
     * Get the "id" developer.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Developer findOne(Long id);

    /**
     * Delete the "id" developer.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
