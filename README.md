# Project Threads : Backend System

This project is an API infrastructure service for the Questions and Answers module of a retail e-commerce application.

## Technologies Used

PostgreSQL | Express | Node | Axios | AWS | NGINX | Redis |

## Description

- Designed database schema for questions, answers, users, and photos.
- Utilized an ETL process to combine over 10 million records into a PostgreSQL database.
- Re-built an existing API service using Node and Express to optimize the performance, and locally stress-tested the service with K6 and Jest.
- Deployed server and database on AWS EC2 instances and stress-tested the service using Loader.io and Artillery.io.
- Horizontally scaled 3 AWS EC2 microservice to handle 2,500 client requests per second and set up an NGINX load balancer instance to distribute requests efficiently while caching with Redis.

## Testing

- Local: k6, Jest
- Deployed: Loader.io, Artillery.io
