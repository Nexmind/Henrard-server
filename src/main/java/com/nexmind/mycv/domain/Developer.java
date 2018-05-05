package com.nexmind.mycv.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonUnwrapped;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.nexmind.mycv.domain.enumeration.Technology;

/**
 * A Developer.
 */
@Entity
@Table(name = "developer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Developer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "philosophy")
    private String philosophy;

    @Column(name = "age")
    private Integer age;

    @Column(name = "picture")
    private String picture;

    @Enumerated(EnumType.STRING)
    @Column(name = "speciality")
    private Technology speciality;

    @OneToMany(mappedBy = "developer")
    @JsonManagedReference
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Skill> skills = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "developer_languages",
        joinColumns = @JoinColumn(name="developers_id", referencedColumnName="id"),
        inverseJoinColumns = @JoinColumn(name="languages_id", referencedColumnName="id"))
    private Set<Language> languages = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Developer name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Developer description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPhilosophy() {
        return philosophy;
    }

    public Developer philosophy(String philosophy) {
        this.philosophy = philosophy;
        return this;
    }

    public void setPhilosophy(String philosophy) {
        this.philosophy = philosophy;
    }

    public Integer getAge() {
        return age;
    }

    public Developer age(Integer age) {
        this.age = age;
        return this;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getPicture() {
        return picture;
    }

    public Developer picture(String picture) {
        this.picture = picture;
        return this;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public Technology getSpeciality() {
        return speciality;
    }

    public Developer speciality(Technology speciality) {
        this.speciality = speciality;
        return this;
    }

    public void setSpeciality(Technology speciality) {
        this.speciality = speciality;
    }

    public Set<Skill> getSkills() {
        return skills;
    }

    public Developer skills(Set<Skill> skills) {
        this.skills = skills;
        return this;
    }

    public Developer addSkills(Skill skill) {
        this.skills.add(skill);
        skill.setDeveloper(this);
        return this;
    }

    public Developer removeSkills(Skill skill) {
        this.skills.remove(skill);
        skill.setDeveloper(null);
        return this;
    }

    public void setSkills(Set<Skill> skills) {
        this.skills = skills;
    }

    public Set<Language> getLanguages() {
        return languages;
    }

    public Developer languages(Set<Language> languages) {
        this.languages = languages;
        return this;
    }

    public Developer addLanguages(Language language) {
        this.languages.add(language);
        language.getDevelopers().add(this);
        return this;
    }

    public Developer removeLanguages(Language language) {
        this.languages.remove(language);
        language.getDevelopers().remove(this);
        return this;
    }

    public void setLanguages(Set<Language> languages) {
        this.languages = languages;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Developer developer = (Developer) o;
        if (developer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), developer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Developer{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", philosophy='" + getPhilosophy() + "'" +
            ", age=" + getAge() +
            ", picture='" + getPicture() + "'" +
            ", speciality='" + getSpeciality() + "'" +
            "}";
    }
}
