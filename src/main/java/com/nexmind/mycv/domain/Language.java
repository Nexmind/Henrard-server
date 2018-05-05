package com.nexmind.mycv.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.nexmind.mycv.domain.enumeration.LanguageCode;

import com.nexmind.mycv.domain.enumeration.Level;

/**
 * A Language.
 */
@Entity
@Table(name = "language")
public class Language implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "code")
    private LanguageCode code;

    @Column(name = "jhi_comment")
    private String comment;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_level")
    private Level level;

    @ManyToMany(mappedBy = "languages")
    @JsonIgnore
    private Set<Developer> developers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LanguageCode getCode() {
        return code;
    }

    public Language code(LanguageCode code) {
        this.code = code;
        return this;
    }

    public void setCode(LanguageCode code) {
        this.code = code;
    }

    public String getComment() {
        return comment;
    }

    public Language comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Level getLevel() {
        return level;
    }

    public Language level(Level level) {
        this.level = level;
        return this;
    }

    public void setLevel(Level level) {
        this.level = level;
    }

    public Set<Developer> getDevelopers() {
        return developers;
    }

    public Language developers(Set<Developer> developers) {
        this.developers = developers;
        return this;
    }

    public Language addDevelopers(Developer developer) {
        this.developers.add(developer);
        developer.getLanguages().add(this);
        return this;
    }

    public Language removeDevelopers(Developer developer) {
        this.developers.remove(developer);
        developer.getLanguages().remove(this);
        return this;
    }

    public void setDevelopers(Set<Developer> developers) {
        this.developers = developers;
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
        Language language = (Language) o;
        if (language.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), language.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Language{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", comment='" + getComment() + "'" +
            ", level='" + getLevel() + "'" +
            "}";
    }
}
