package com.nexmind.mycv.service.impl;

import com.nexmind.mycv.service.DeveloperService;
import com.nexmind.mycv.domain.Developer;
import com.nexmind.mycv.repository.DeveloperRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Developer.
 */
@Service
@Transactional
public class DeveloperServiceImpl implements DeveloperService {

    private final Logger log = LoggerFactory.getLogger(DeveloperServiceImpl.class);

    private final DeveloperRepository developerRepository;

    public DeveloperServiceImpl(DeveloperRepository developerRepository) {
        this.developerRepository = developerRepository;
    }

    /**
     * Save a developer.
     *
     * @param developer the entity to save
     * @return the persisted entity
     */
    @Override
    public Developer save(Developer developer) {
        log.debug("Request to save Developer : {}", developer);
        return developerRepository.save(developer);
    }

    /**
     * Get all the developers.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Developer> findAll() {
        log.debug("Request to get all Developers");
        return developerRepository.findAllWithEagerRelationships();
    }

    /**
     * Get one developer by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Developer findOne(Long id) {
        log.debug("Request to get Developer : {}", id);
        return developerRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the developer by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Developer : {}", id);
        developerRepository.delete(id);
    }
}
