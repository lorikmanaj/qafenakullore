IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE TABLE [OrderStatuses] (
        [StatusId] int NOT NULL IDENTITY,
        [Status] nvarchar(max) NULL,
        CONSTRAINT [PK_OrderStatuses] PRIMARY KEY ([StatusId])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE TABLE [PaymentMethods] (
        [PaymentMethodId] int NOT NULL IDENTITY,
        [Name] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_PaymentMethods] PRIMARY KEY ([PaymentMethodId])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE TABLE [Products] (
        [ProductId] int NOT NULL IDENTITY,
        [TypeId] int NOT NULL,
        [Name] nvarchar(max) NULL,
        [Description] nvarchar(max) NULL,
        [Price] decimal(18,2) NOT NULL,
        [Image] nvarchar(max) NULL,
        [Background] nvarchar(max) NULL,
        [StockId] int NOT NULL,
        CONSTRAINT [PK_Products] PRIMARY KEY ([ProductId])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE TABLE [ProductTypes] (
        [TypeId] int NOT NULL IDENTITY,
        [Type] nvarchar(max) NULL,
        CONSTRAINT [PK_ProductTypes] PRIMARY KEY ([TypeId])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE TABLE [ProfileOptions] (
        [OptionId] int NOT NULL IDENTITY,
        [Option] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_ProfileOptions] PRIMARY KEY ([OptionId])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE TABLE [Roles] (
        [Id] nvarchar(450) NOT NULL,
        [Name] nvarchar(256) NULL,
        [NormalizedName] nvarchar(256) NULL,
        [ConcurrencyStamp] nvarchar(max) NULL,
        CONSTRAINT [PK_Roles] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE TABLE [Sliders] (
        [SliderId] int NOT NULL IDENTITY,
        [Title] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_Sliders] PRIMARY KEY ([SliderId])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE TABLE [Tags] (
        [TagId] int NOT NULL IDENTITY,
        [Title] nvarchar(max) NULL,
        CONSTRAINT [PK_Tags] PRIMARY KEY ([TagId])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE TABLE [Users] (
        [Id] nvarchar(450) NOT NULL,
        [FirstName] nvarchar(max) NULL,
        [LastName] nvarchar(max) NULL,
        [AvatarUrl] nvarchar(max) NULL,
        [UserName] nvarchar(256) NULL,
        [NormalizedUserName] nvarchar(256) NULL,
        [Email] nvarchar(256) NULL,
        [NormalizedEmail] nvarchar(256) NULL,
        [EmailConfirmed] bit NOT NULL,
        [PasswordHash] nvarchar(max) NULL,
        [SecurityStamp] nvarchar(max) NULL,
        [ConcurrencyStamp] nvarchar(max) NULL,
        [PhoneNumber] nvarchar(max) NULL,
        [PhoneNumberConfirmed] bit NOT NULL,
        [TwoFactorEnabled] bit NOT NULL,
        [LockoutEnd] datetimeoffset NULL,
        [LockoutEnabled] bit NOT NULL,
        [AccessFailedCount] int NOT NULL,
        CONSTRAINT [PK_Users] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE TABLE [Galleries] (
        [GalleryId] int NOT NULL IDENTITY,
        [ProductId] int NOT NULL,
        CONSTRAINT [PK_Galleries] PRIMARY KEY ([GalleryId]),
        CONSTRAINT [FK_Galleries_Products_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [Products] ([ProductId]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE TABLE [PromoProducts] (
        [PromoId] int NOT NULL IDENTITY,
        [ProductId] int NOT NULL,
        [DateAdded] datetime2 NOT NULL,
        CONSTRAINT [PK_PromoProducts] PRIMARY KEY ([PromoId]),
        CONSTRAINT [FK_PromoProducts_Products_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [Products] ([ProductId]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE TABLE [Stocks] (
        [StockId] int NOT NULL IDENTITY,
        [ProductId] int NOT NULL,
        [Quantity] int NOT NULL,
        CONSTRAINT [PK_Stocks] PRIMARY KEY ([StockId]),
        CONSTRAINT [FK_Stocks_Products_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [Products] ([ProductId]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE TABLE [Varieties] (
        [VarietyId] int NOT NULL IDENTITY,
        [ProductId] int NOT NULL,
        [Description] nvarchar(max) NULL,
        [ImageUrl] nvarchar(max) NULL,
        CONSTRAINT [PK_Varieties] PRIMARY KEY ([VarietyId]),
        CONSTRAINT [FK_Varieties_Products_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [Products] ([ProductId]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE TABLE [AspNetRoleClaims] (
        [Id] int NOT NULL IDENTITY,
        [RoleId] nvarchar(450) NOT NULL,
        [ClaimType] nvarchar(max) NULL,
        [ClaimValue] nvarchar(max) NULL,
        CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_AspNetRoleClaims_Roles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [Roles] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE TABLE [SliderItems] (
        [SliderItemId] int NOT NULL IDENTITY,
        [SliderId] int NOT NULL,
        [ProductId] int NOT NULL,
        CONSTRAINT [PK_SliderItems] PRIMARY KEY ([SliderItemId]),
        CONSTRAINT [FK_SliderItems_Products_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [Products] ([ProductId]) ON DELETE CASCADE,
        CONSTRAINT [FK_SliderItems_Sliders_SliderId] FOREIGN KEY ([SliderId]) REFERENCES [Sliders] ([SliderId]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE TABLE [ProductTags] (
        [ProductTagId] int NOT NULL IDENTITY,
        [ProductId] int NOT NULL,
        [TagId] int NOT NULL,
        CONSTRAINT [PK_ProductTags] PRIMARY KEY ([ProductTagId]),
        CONSTRAINT [FK_ProductTags_Products_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [Products] ([ProductId]) ON DELETE CASCADE,
        CONSTRAINT [FK_ProductTags_Tags_TagId] FOREIGN KEY ([TagId]) REFERENCES [Tags] ([TagId]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE TABLE [Carts] (
        [CartId] int NOT NULL IDENTITY,
        [UserId] nvarchar(450) NOT NULL,
        CONSTRAINT [PK_Carts] PRIMARY KEY ([CartId]),
        CONSTRAINT [FK_Carts_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE TABLE [Orders] (
        [OrderId] int NOT NULL IDENTITY,
        [UserId] nvarchar(450) NOT NULL,
        [Date] datetime2 NOT NULL,
        [OrderStatusId] int NOT NULL,
        [ShippingAddress] nvarchar(max) NOT NULL,
        [PaymentMethodId] int NOT NULL,
        [OrderNotes] nvarchar(max) NULL,
        CONSTRAINT [PK_Orders] PRIMARY KEY ([OrderId]),
        CONSTRAINT [FK_Orders_OrderStatuses_OrderStatusId] FOREIGN KEY ([OrderStatusId]) REFERENCES [OrderStatuses] ([StatusId]) ON DELETE CASCADE,
        CONSTRAINT [FK_Orders_PaymentMethods_PaymentMethodId] FOREIGN KEY ([PaymentMethodId]) REFERENCES [PaymentMethods] ([PaymentMethodId]) ON DELETE CASCADE,
        CONSTRAINT [FK_Orders_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE TABLE [ProductReviews] (
        [ProdRevId] int NOT NULL IDENTITY,
        [ProductId] int NOT NULL,
        [UserId] nvarchar(450) NULL,
        [Comment] nvarchar(max) NULL,
        [Rating] int NOT NULL,
        [DateReviewed] datetime2 NOT NULL,
        CONSTRAINT [PK_ProductReviews] PRIMARY KEY ([ProdRevId]),
        CONSTRAINT [FK_ProductReviews_Products_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [Products] ([ProductId]) ON DELETE CASCADE,
        CONSTRAINT [FK_ProductReviews_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE TABLE [Testimonials] (
        [TestimonialId] int NOT NULL IDENTITY,
        [UserId] nvarchar(450) NOT NULL,
        [Comment] nvarchar(max) NOT NULL,
        [DateAdded] datetime2 NOT NULL,
        [Rating] int NOT NULL,
        CONSTRAINT [PK_Testimonials] PRIMARY KEY ([TestimonialId]),
        CONSTRAINT [FK_Testimonials_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE TABLE [UserClaims] (
        [Id] int NOT NULL IDENTITY,
        [UserId] nvarchar(450) NOT NULL,
        [ClaimType] nvarchar(max) NULL,
        [ClaimValue] nvarchar(max) NULL,
        CONSTRAINT [PK_UserClaims] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_UserClaims_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE TABLE [UserLogins] (
        [UserId] nvarchar(450) NOT NULL,
        [LoginProvider] nvarchar(max) NULL,
        [ProviderKey] nvarchar(max) NULL,
        [ProviderDisplayName] nvarchar(max) NULL,
        CONSTRAINT [PK_UserLogins] PRIMARY KEY ([UserId]),
        CONSTRAINT [FK_UserLogins_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE TABLE [UserRoles] (
        [UserId] nvarchar(450) NOT NULL,
        [RoleId] nvarchar(450) NOT NULL,
        CONSTRAINT [PK_UserRoles] PRIMARY KEY ([UserId], [RoleId]),
        CONSTRAINT [FK_UserRoles_Roles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [Roles] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_UserRoles_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE TABLE [UserTokens] (
        [UserId] nvarchar(450) NOT NULL,
        [LoginProvider] nvarchar(max) NULL,
        [Name] nvarchar(max) NULL,
        [Value] nvarchar(max) NULL,
        CONSTRAINT [PK_UserTokens] PRIMARY KEY ([UserId]),
        CONSTRAINT [FK_UserTokens_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE TABLE [WishLists] (
        [WishListId] int NOT NULL IDENTITY,
        [UserId] nvarchar(450) NULL,
        CONSTRAINT [PK_WishLists] PRIMARY KEY ([WishListId]),
        CONSTRAINT [FK_WishLists_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE TABLE [ItemGalleries] (
        [ItemGalleryId] int NOT NULL IDENTITY,
        [GalleryId] int NOT NULL,
        [ProductId] int NOT NULL,
        [ImageUrl] nvarchar(max) NULL,
        CONSTRAINT [PK_ItemGalleries] PRIMARY KEY ([ItemGalleryId]),
        CONSTRAINT [FK_ItemGalleries_Galleries_GalleryId] FOREIGN KEY ([GalleryId]) REFERENCES [Galleries] ([GalleryId]) ON DELETE CASCADE,
        CONSTRAINT [FK_ItemGalleries_Products_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [Products] ([ProductId])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE TABLE [CartItems] (
        [CartItemId] int NOT NULL IDENTITY,
        [CartId] int NOT NULL,
        [ProductId] int NOT NULL,
        [ItemName] nvarchar(max) NOT NULL,
        [Quantity] int NOT NULL,
        CONSTRAINT [PK_CartItems] PRIMARY KEY ([CartItemId]),
        CONSTRAINT [FK_CartItems_Carts_CartId] FOREIGN KEY ([CartId]) REFERENCES [Carts] ([CartId]) ON DELETE CASCADE,
        CONSTRAINT [FK_CartItems_Products_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [Products] ([ProductId]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE TABLE [Discounts] (
        [DiscountId] int NOT NULL IDENTITY,
        [Description] nvarchar(max) NOT NULL,
        [OrderId] int NULL,
        CONSTRAINT [PK_Discounts] PRIMARY KEY ([DiscountId]),
        CONSTRAINT [FK_Discounts_Orders_OrderId] FOREIGN KEY ([OrderId]) REFERENCES [Orders] ([OrderId])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE TABLE [OrderProducts] (
        [OPId] int NOT NULL IDENTITY,
        [OrderId] int NOT NULL,
        [ProductId] int NOT NULL,
        CONSTRAINT [PK_OrderProducts] PRIMARY KEY ([OPId]),
        CONSTRAINT [FK_OrderProducts_Orders_OrderId] FOREIGN KEY ([OrderId]) REFERENCES [Orders] ([OrderId]) ON DELETE CASCADE,
        CONSTRAINT [FK_OrderProducts_Products_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [Products] ([ProductId]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE TABLE [WishListItems] (
        [WishListItemId] int NOT NULL IDENTITY,
        [WishListId] int NOT NULL,
        [ProductId] int NOT NULL,
        CONSTRAINT [PK_WishListItems] PRIMARY KEY ([WishListItemId]),
        CONSTRAINT [FK_WishListItems_Products_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [Products] ([ProductId]) ON DELETE CASCADE,
        CONSTRAINT [FK_WishListItems_WishLists_WishListId] FOREIGN KEY ([WishListId]) REFERENCES [WishLists] ([WishListId]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] ON;
    EXEC(N'INSERT INTO [Roles] ([Id], [ConcurrencyStamp], [Name], [NormalizedName])
    VALUES (N''468796aa-7af3-4a6e-9dad-547bc3448449'', NULL, N''Administrator'', N''ADMINISTRATOR''),
    (N''4b1b93cc-e0b3-46d2-8197-d9b5d6bba03e'', NULL, N''User'', N''USER'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE INDEX [IX_AspNetRoleClaims_RoleId] ON [AspNetRoleClaims] ([RoleId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE INDEX [IX_CartItems_CartId] ON [CartItems] ([CartId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE INDEX [IX_CartItems_ProductId] ON [CartItems] ([ProductId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE UNIQUE INDEX [IX_Carts_UserId] ON [Carts] ([UserId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE INDEX [IX_Discounts_OrderId] ON [Discounts] ([OrderId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE INDEX [IX_Galleries_ProductId] ON [Galleries] ([ProductId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE INDEX [IX_ItemGalleries_GalleryId] ON [ItemGalleries] ([GalleryId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE INDEX [IX_ItemGalleries_ProductId] ON [ItemGalleries] ([ProductId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE INDEX [IX_OrderProducts_OrderId] ON [OrderProducts] ([OrderId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE INDEX [IX_OrderProducts_ProductId] ON [OrderProducts] ([ProductId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE INDEX [IX_Orders_OrderStatusId] ON [Orders] ([OrderStatusId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE INDEX [IX_Orders_PaymentMethodId] ON [Orders] ([PaymentMethodId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE INDEX [IX_Orders_UserId] ON [Orders] ([UserId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE INDEX [IX_ProductReviews_ProductId] ON [ProductReviews] ([ProductId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE INDEX [IX_ProductReviews_UserId] ON [ProductReviews] ([UserId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE INDEX [IX_ProductTags_ProductId] ON [ProductTags] ([ProductId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE INDEX [IX_ProductTags_TagId] ON [ProductTags] ([TagId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE INDEX [IX_PromoProducts_ProductId] ON [PromoProducts] ([ProductId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    EXEC(N'CREATE UNIQUE INDEX [RoleNameIndex] ON [Roles] ([NormalizedName]) WHERE [NormalizedName] IS NOT NULL');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE INDEX [IX_SliderItems_ProductId] ON [SliderItems] ([ProductId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE INDEX [IX_SliderItems_SliderId] ON [SliderItems] ([SliderId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE INDEX [IX_Stocks_ProductId] ON [Stocks] ([ProductId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE INDEX [IX_Testimonials_UserId] ON [Testimonials] ([UserId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE INDEX [IX_UserClaims_UserId] ON [UserClaims] ([UserId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE INDEX [IX_UserRoles_RoleId] ON [UserRoles] ([RoleId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE INDEX [EmailIndex] ON [Users] ([NormalizedEmail]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    EXEC(N'CREATE UNIQUE INDEX [UserNameIndex] ON [Users] ([NormalizedUserName]) WHERE [NormalizedUserName] IS NOT NULL');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE INDEX [IX_Varieties_ProductId] ON [Varieties] ([ProductId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE INDEX [IX_WishListItems_ProductId] ON [WishListItems] ([ProductId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE INDEX [IX_WishListItems_WishListId] ON [WishListItems] ([WishListId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    CREATE INDEX [IX_WishLists_UserId] ON [WishLists] ([UserId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231022122301_Initial Migration')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20231022122301_Initial Migration', N'7.0.12');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231023213331_Added Description in Products')
BEGIN
    EXEC(N'DELETE FROM [Roles]
    WHERE [Id] = N''468796aa-7af3-4a6e-9dad-547bc3448449'';
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231023213331_Added Description in Products')
BEGIN
    EXEC(N'DELETE FROM [Roles]
    WHERE [Id] = N''4b1b93cc-e0b3-46d2-8197-d9b5d6bba03e'';
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231023213331_Added Description in Products')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] ON;
    EXEC(N'INSERT INTO [Roles] ([Id], [ConcurrencyStamp], [Name], [NormalizedName])
    VALUES (N''70755f3a-96e4-48ac-8201-787e8946ff40'', NULL, N''User'', N''USER''),
    (N''aa5fb9ee-c25c-40f1-b62f-167cebe7fe62'', NULL, N''Administrator'', N''ADMINISTRATOR'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231023213331_Added Description in Products')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20231023213331_Added Description in Products', N'7.0.12');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231103122442_Added Blobs for Images')
BEGIN
    EXEC(N'DELETE FROM [Roles]
    WHERE [Id] = N''70755f3a-96e4-48ac-8201-787e8946ff40'';
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231103122442_Added Blobs for Images')
BEGIN
    EXEC(N'DELETE FROM [Roles]
    WHERE [Id] = N''aa5fb9ee-c25c-40f1-b62f-167cebe7fe62'';
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231103122442_Added Blobs for Images')
BEGIN
    ALTER TABLE [Varieties] ADD [ImageBlob] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231103122442_Added Blobs for Images')
BEGIN
    ALTER TABLE [Products] ADD [BgImageBlob] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231103122442_Added Blobs for Images')
BEGIN
    ALTER TABLE [Products] ADD [MainImageBlob] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231103122442_Added Blobs for Images')
BEGIN
    ALTER TABLE [ItemGalleries] ADD [ImageBlob] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231103122442_Added Blobs for Images')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] ON;
    EXEC(N'INSERT INTO [Roles] ([Id], [ConcurrencyStamp], [Name], [NormalizedName])
    VALUES (N''2c6f0420-b5dc-44f2-b93c-75ffa6b85f9b'', NULL, N''User'', N''USER''),
    (N''59a3be12-0ecf-4e09-813e-a889b228fd71'', NULL, N''Administrator'', N''ADMINISTRATOR'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231103122442_Added Blobs for Images')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20231103122442_Added Blobs for Images', N'7.0.12');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231107150929_Added Total for Order')
BEGIN
    EXEC(N'DELETE FROM [Roles]
    WHERE [Id] = N''2c6f0420-b5dc-44f2-b93c-75ffa6b85f9b'';
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231107150929_Added Total for Order')
BEGIN
    EXEC(N'DELETE FROM [Roles]
    WHERE [Id] = N''59a3be12-0ecf-4e09-813e-a889b228fd71'';
    SELECT @@ROWCOUNT');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231107150929_Added Total for Order')
BEGIN
    EXEC sp_rename N'[OrderProducts].[OPId]', N'OrderProductId', N'COLUMN';
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231107150929_Added Total for Order')
BEGIN
    ALTER TABLE [Orders] ADD [Total] decimal(18,2) NOT NULL DEFAULT 0.0;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231107150929_Added Total for Order')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] ON;
    EXEC(N'INSERT INTO [Roles] ([Id], [ConcurrencyStamp], [Name], [NormalizedName])
    VALUES (N''509ad108-149f-4230-9099-79591caf05e8'', NULL, N''User'', N''USER''),
    (N''e70e4f82-adcc-42c7-badc-eb9979a21eb8'', NULL, N''Administrator'', N''ADMINISTRATOR'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
        SET IDENTITY_INSERT [Roles] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231107150929_Added Total for Order')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20231107150929_Added Total for Order', N'7.0.12');
END;
GO

COMMIT;
GO

