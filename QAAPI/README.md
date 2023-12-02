# Authentication-Authorization-Service

![build](https://github.com/santos-an/Authentication-Authorization-Service/actions/workflows/build.yml/badge.svg)
![test](https://github.com/santos-an/Authentication-Authorization-Service/actions/workflows/test.yml/badge.svg)

## Introduction
This is a sample API, using Authentication and Authorization on **Microsoft .NET 7**. 
We have several endpoints, that require different authentication policies for access (via JWT Bearer Token). 

## Api layer

**Auth endpoint**

- POST `/Auth/Register` - Registers a new user. Returns a new access token
- POST `/Auth/Login` - Validates user credentials. Returns a new access token
- POST `/Auth/UpdateToken` - Validates the expired access token. Returns new access token 

**Claim endpoint**

- GET `/Claims/GetAll` - Returns all claims
- GET `/Claims/GetUserClaims` - Returns the Claims for a given user
- POST `/Claims/AddClaimToUser` - Add a new claim to a user

**Company endpoint**

- GET `/Companies/GetAll` - Returns all companies

**Product endpoint**
 
- GET `/Products/GetAll` - Returns all products
- GET `/Products/Get` - Get a product by id

**Role endpoint**

- GET `/Roles/GetAll` - Get all roles in the system
- POST `/Roles/Create` - Add a new role to the system
- POST `/Roles/AddRoleToUser` - Add a role to a user
- GET `/Roles/GetUserRoles` - Gets the roles for a given user
- DELETE `/Roles/DeleteUserFromRole` - Removes a role from a user

**SuperUser endpoint**
 
- GET `/SuperUser/GetAll` - Returns Guid.New :) (testing purposes) 

**User endpoint**

- GET `/Users/GetAll` - Returns all user on the system

## Policies
We use policies to secure the endpoints:
- `Standard` - Only authenticated users can access the resource.
- `Administrator` - Only authenticated users, with the Admin role, can access the resource 
- `SuperUser` - Only authenticated users, with the Admin role and the claim 'super' can access the resource
- `Open to all` - Open to everyone ;)

## Endpoints and policies
- Administrator policy (Claims, Roles & Users endpoints)
- Standard policy (Products endpoint)
- Super user policy (Companies & SuperUser endpoints)
- Open to all policy (Auth endpoint)

## Roles
We have 2 roles on the system:
- `Admin`
- `Standard`

Users with the *Admin role* can access:
- Standard policies
- Administrator policies

Users with the *Standard role* can access:
- Standard policies. 

When a new user is registered, we automatically assign the 'Standard role'.
To access other resources, we need to attach the 'Admin' role to the new registered user. Please use the `/Roles/AddRoleToUser` post endpoint. 

## Test Users
Administrators (to access endpoints that require the *Administrator* and *Standard policy*)
- `roland.mueller@gmail.com`
- `kristine_littel@gmail.com`
- `wm_heller92@hotmail.com`

Standard (to access endpoints that require the *Standard policy*)
- `lauren_rowe@yahoo.com`
- `eddie_ledner92@hotmail.com`
- `carl_kohler@yahoo.com`

All users share the same password credentials: `password`.

## Technologies
This demo application uses the following technologies:
 - .NET 7
 - C# 11
 - ASP.NET Core MVC 7.0
 - EF Core 7.0
 - Rider 2022
 - SQL Server 2022
 - Bogus 34.0
 - IdentityModel.Tokens.Jwt 6.25
