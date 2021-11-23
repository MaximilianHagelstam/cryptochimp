package com.maxim.server.models;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue()
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false)
    private Integer cash;

    public User() {
    }

    public User(Long id, String name, String imageUrl, Integer cash) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.cash = cash;
    }

    public User(String name, String imageUrl, Integer cash) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.cash = cash;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Integer getCash() {
        return cash;
    }

    public void setCash(Integer cash) {
        this.cash = cash;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", cash=" + cash +
                '}';
    }
}
