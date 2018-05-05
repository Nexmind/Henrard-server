package com.nexmind.mycv.service.impl;

import com.nexmind.mycv.service.LanguageService;
import com.nexmind.mycv.domain.Language;
import com.nexmind.mycv.repository.LanguageRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Language.
 */
@Service
@Transactional
public class LanguageServiceImpl implements LanguageService {

    private final Logger log = LoggerFactory.getLogger(LanguageServiceImpl.class);

    private final LanguageRepository languageRepository;

    public LanguageServiceImpl(LanguageRepository languageRepository) {
        this.languageRepository = languageRepository;
    }

    /**
     * Save a language.
     *
     * @param language the entity to save
     * @return the persisted entity
     */
    @Override
    public Language save(Language language) {
        log.debug("Request to save Language : {}", language);
        return languageRepository.save(language);
    }

    /**
     * Get all the languages.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Language> findAll() {
        log.debug("Request to get all Languages");
        return languageRepository.findAll();
    }

    /**
     * Get one language by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Language findOne(Long id) {
        log.debug("Request to get Language : {}", id);
        return languageRepository.findOne(id);
    }

    /**
     * Delete the language by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Language : {}", id);
        languageRepository.delete(id);
    }
}
