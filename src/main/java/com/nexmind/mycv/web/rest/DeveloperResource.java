package com.nexmind.mycv.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.nexmind.mycv.domain.Developer;
import com.nexmind.mycv.security.AuthoritiesConstants;
import com.nexmind.mycv.service.DeveloperService;
import com.nexmind.mycv.web.rest.errors.BadRequestAlertException;
import com.nexmind.mycv.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Developer.
 */
@RestController
@RequestMapping("/api")
public class DeveloperResource {

    private final Logger log = LoggerFactory.getLogger(DeveloperResource.class);

    private static final String ENTITY_NAME = "developer";

    private final DeveloperService developerService;

    public DeveloperResource(DeveloperService developerService) {
        this.developerService = developerService;
    }

    /**
     * POST  /developers : Create a new developer.
     *
     * @param developer the developer to create
     * @return the ResponseEntity with status 201 (Created) and with body the new developer, or with status 400 (Bad Request) if the developer has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/developers")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Developer> createDeveloper(@RequestBody Developer developer) throws URISyntaxException {
        log.debug("REST request to save Developer : {}", developer);
        if (developer.getId() != null) {
            throw new BadRequestAlertException("A new developer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Developer result = developerService.save(developer);
        return ResponseEntity.created(new URI("/api/developers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /developers : Updates an existing developer.
     *
     * @param developer the developer to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated developer,
     * or with status 400 (Bad Request) if the developer is not valid,
     * or with status 500 (Internal Server Error) if the developer couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/developers")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Developer> updateDeveloper(@RequestBody Developer developer) throws URISyntaxException {
        log.debug("REST request to update Developer : {}", developer);
        if (developer.getId() == null) {
            return createDeveloper(developer);
        }
        Developer result = developerService.save(developer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, developer.getId().toString()))
            .body(result);
    }

    /**
     * GET  /developers : get all the developers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of developers in body
     */
    @GetMapping("/developers")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public List<Developer> getAllDevelopers() {
        log.debug("REST request to get all Developers");
        return developerService.findAll();
        }

    /**
     * GET  /developers/:id : get the "id" developer.
     *
     * @param id the id of the developer to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the developer, or with status 404 (Not Found)
     */
    @GetMapping("/developers/{id}")
    @Timed
    public ResponseEntity<Developer> getDeveloper(@PathVariable Long id) {
        log.debug("REST request to get Developer : {}", id);
        Developer developer = developerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(developer));
    }

    /**
     * DELETE  /developers/:id : delete the "id" developer.
     *
     * @param id the id of the developer to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/developers/{id}")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Void> deleteDeveloper(@PathVariable Long id) {
        log.debug("REST request to delete Developer : {}", id);
        developerService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
