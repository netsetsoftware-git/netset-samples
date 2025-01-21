package netset.starter.notifier.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import netset.starter.notifier.entity.Person;

public interface PersonRepository extends JpaRepository<Person, Long>{

}
