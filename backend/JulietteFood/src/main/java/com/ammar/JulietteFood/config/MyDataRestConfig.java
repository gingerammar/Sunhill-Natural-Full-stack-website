package com.ammar.JulietteFood.config;

import com.ammar.JulietteFood.entity.Country;
import com.ammar.JulietteFood.entity.Product;
import com.ammar.JulietteFood.entity.ProductCategory;
import com.ammar.JulietteFood.entity.State;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration // let's spring know this is a config file so it will scan it
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;

    //autowired provides the entity manager automatically when you crate a data rest congig
    //so you can use the entity manager and u dont have to pass one in yourself
    @Autowired
    public MyDataRestConfig(EntityManager theEntityManager){
        entityManager= theEntityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

        makeReadOnly(Product.class, config);
        makeReadOnly(ProductCategory.class, config);
        makeReadOnly(Country.class, config);
        makeReadOnly(State.class, config);

        exposeIds(config);
    }

    private static void makeReadOnly(Class theClass, RepositoryRestConfiguration config) {
        // make a list of all the http methods we want to disable
        HttpMethod[] theUnsupportedActions = {HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE};

        // using the config object we get as a parameter
        config.getExposureConfiguration()
                .forDomainType(theClass)//these configurations will only apply to product
                //using the lamda symbol -> were saying take each item of the metadata (each product
                //and out of all its http methods disable the list we made
                .withItemExposure((metadata, httpMethods)-> httpMethods.disable(theUnsupportedActions))
                //this does the same thing but for the whole collection so they cant do things to a batch
                .withCollectionExposure((metadata, httpMethods)-> httpMethods.disable(theUnsupportedActions));


        //once this is done to check that they are disabled you can use postman
        //get requests should work
        //but post put or delete sent with a json file should receive ea 405 error method not allowed
    }

    private void exposeIds(RepositoryRestConfiguration config) {
        //expose entity ids

        //get a list of all the entities (wrapped up table matadatas) we have
        //uses entity manager's built in tools to look at all the metadata and return a list of entities i our program.
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        //create an array list of all the entity types
        List<Class> entityClasses = new ArrayList<>();

        /*goes thru all the entities that we have and takes the java
        class from them sow e can use the method .exposeIdsFor which
        only works for a list of classes not entities */
        for(EntityType tempEntityType : entities){
            entityClasses.add(tempEntityType.getJavaType());
        }

        //turn the array list into an array
        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }
}
