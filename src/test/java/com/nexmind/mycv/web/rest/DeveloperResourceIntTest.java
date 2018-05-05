package com.nexmind.mycv.web.rest;

import com.nexmind.mycv.MycvApp;

import com.nexmind.mycv.domain.Developer;
import com.nexmind.mycv.repository.DeveloperRepository;
import com.nexmind.mycv.service.DeveloperService;
import com.nexmind.mycv.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.nexmind.mycv.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.nexmind.mycv.domain.enumeration.Technology;
/**
 * Test class for the DeveloperResource REST controller.
 *
 * @see DeveloperResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MycvApp.class)
public class DeveloperResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_PHILOSOPHY = "AAAAAAAAAA";
    private static final String UPDATED_PHILOSOPHY = "BBBBBBBBBB";

    private static final Integer DEFAULT_AGE = 1;
    private static final Integer UPDATED_AGE = 2;

    private static final String DEFAULT_PICTURE = "AAAAAAAAAA";
    private static final String UPDATED_PICTURE = "BBBBBBBBBB";

    private static final Technology DEFAULT_SPECIALITY = Technology.IOS;
    private static final Technology UPDATED_SPECIALITY = Technology.ANDROID;

    @Autowired
    private DeveloperRepository developerRepository;

    @Autowired
    private DeveloperService developerService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDeveloperMockMvc;

    private Developer developer;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DeveloperResource developerResource = new DeveloperResource(developerService);
        this.restDeveloperMockMvc = MockMvcBuilders.standaloneSetup(developerResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Developer createEntity(EntityManager em) {
        Developer developer = new Developer()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .philosophy(DEFAULT_PHILOSOPHY)
            .age(DEFAULT_AGE)
            .picture(DEFAULT_PICTURE)
            .speciality(DEFAULT_SPECIALITY);
        return developer;
    }

    @Before
    public void initTest() {
        developer = createEntity(em);
    }

    @Test
    @Transactional
    public void createDeveloper() throws Exception {
        int databaseSizeBeforeCreate = developerRepository.findAll().size();

        // Create the Developer
        restDeveloperMockMvc.perform(post("/api/developers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(developer)))
            .andExpect(status().isCreated());

        // Validate the Developer in the database
        List<Developer> developerList = developerRepository.findAll();
        assertThat(developerList).hasSize(databaseSizeBeforeCreate + 1);
        Developer testDeveloper = developerList.get(developerList.size() - 1);
        assertThat(testDeveloper.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testDeveloper.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testDeveloper.getPhilosophy()).isEqualTo(DEFAULT_PHILOSOPHY);
        assertThat(testDeveloper.getAge()).isEqualTo(DEFAULT_AGE);
        assertThat(testDeveloper.getPicture()).isEqualTo(DEFAULT_PICTURE);
        assertThat(testDeveloper.getSpeciality()).isEqualTo(DEFAULT_SPECIALITY);
    }

    @Test
    @Transactional
    public void createDeveloperWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = developerRepository.findAll().size();

        // Create the Developer with an existing ID
        developer.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDeveloperMockMvc.perform(post("/api/developers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(developer)))
            .andExpect(status().isBadRequest());

        // Validate the Developer in the database
        List<Developer> developerList = developerRepository.findAll();
        assertThat(developerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDevelopers() throws Exception {
        // Initialize the database
        developerRepository.saveAndFlush(developer);

        // Get all the developerList
        restDeveloperMockMvc.perform(get("/api/developers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(developer.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].philosophy").value(hasItem(DEFAULT_PHILOSOPHY.toString())))
            .andExpect(jsonPath("$.[*].age").value(hasItem(DEFAULT_AGE)))
            .andExpect(jsonPath("$.[*].picture").value(hasItem(DEFAULT_PICTURE.toString())))
            .andExpect(jsonPath("$.[*].speciality").value(hasItem(DEFAULT_SPECIALITY.toString())));
    }

    @Test
    @Transactional
    public void getDeveloper() throws Exception {
        // Initialize the database
        developerRepository.saveAndFlush(developer);

        // Get the developer
        restDeveloperMockMvc.perform(get("/api/developers/{id}", developer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(developer.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.philosophy").value(DEFAULT_PHILOSOPHY.toString()))
            .andExpect(jsonPath("$.age").value(DEFAULT_AGE))
            .andExpect(jsonPath("$.picture").value(DEFAULT_PICTURE.toString()))
            .andExpect(jsonPath("$.speciality").value(DEFAULT_SPECIALITY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDeveloper() throws Exception {
        // Get the developer
        restDeveloperMockMvc.perform(get("/api/developers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDeveloper() throws Exception {
        // Initialize the database
        developerService.save(developer);

        int databaseSizeBeforeUpdate = developerRepository.findAll().size();

        // Update the developer
        Developer updatedDeveloper = developerRepository.findOne(developer.getId());
        // Disconnect from session so that the updates on updatedDeveloper are not directly saved in db
        em.detach(updatedDeveloper);
        updatedDeveloper
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .philosophy(UPDATED_PHILOSOPHY)
            .age(UPDATED_AGE)
            .picture(UPDATED_PICTURE)
            .speciality(UPDATED_SPECIALITY);

        restDeveloperMockMvc.perform(put("/api/developers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDeveloper)))
            .andExpect(status().isOk());

        // Validate the Developer in the database
        List<Developer> developerList = developerRepository.findAll();
        assertThat(developerList).hasSize(databaseSizeBeforeUpdate);
        Developer testDeveloper = developerList.get(developerList.size() - 1);
        assertThat(testDeveloper.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testDeveloper.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testDeveloper.getPhilosophy()).isEqualTo(UPDATED_PHILOSOPHY);
        assertThat(testDeveloper.getAge()).isEqualTo(UPDATED_AGE);
        assertThat(testDeveloper.getPicture()).isEqualTo(UPDATED_PICTURE);
        assertThat(testDeveloper.getSpeciality()).isEqualTo(UPDATED_SPECIALITY);
    }

    @Test
    @Transactional
    public void updateNonExistingDeveloper() throws Exception {
        int databaseSizeBeforeUpdate = developerRepository.findAll().size();

        // Create the Developer

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDeveloperMockMvc.perform(put("/api/developers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(developer)))
            .andExpect(status().isCreated());

        // Validate the Developer in the database
        List<Developer> developerList = developerRepository.findAll();
        assertThat(developerList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDeveloper() throws Exception {
        // Initialize the database
        developerService.save(developer);

        int databaseSizeBeforeDelete = developerRepository.findAll().size();

        // Get the developer
        restDeveloperMockMvc.perform(delete("/api/developers/{id}", developer.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Developer> developerList = developerRepository.findAll();
        assertThat(developerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Developer.class);
        Developer developer1 = new Developer();
        developer1.setId(1L);
        Developer developer2 = new Developer();
        developer2.setId(developer1.getId());
        assertThat(developer1).isEqualTo(developer2);
        developer2.setId(2L);
        assertThat(developer1).isNotEqualTo(developer2);
        developer1.setId(null);
        assertThat(developer1).isNotEqualTo(developer2);
    }
}
