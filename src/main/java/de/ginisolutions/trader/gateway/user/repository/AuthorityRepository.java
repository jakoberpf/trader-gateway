package de.ginisolutions.trader.gateway.user.repository;

import de.ginisolutions.trader.gateway.user.domain.Authority;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends MongoRepository<Authority, String> {
}
