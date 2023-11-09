CREATE TABLE [OrderStatuses] (
    [StatusId] int NOT NULL IDENTITY,
    [Status] nvarchar(max) NULL,
    CONSTRAINT [PK_OrderStatuses] PRIMARY KEY ([StatusId])
);
GO


CREATE TABLE [PaymentMethods] (
    [PaymentMethodId] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_PaymentMethods] PRIMARY KEY ([PaymentMethodId])
);
GO


CREATE TABLE [Products] (
    [ProductId] int NOT NULL IDENTITY,
    [TypeId] int NOT NULL,
    [Name] nvarchar(max) NULL,
    [Description] nvarchar(max) NULL,
    [Price] decimal(18,2) NOT NULL,
    [Image] nvarchar(max) NULL,
    [Background] nvarchar(max) NULL,
    [StockId] int NOT NULL,
    [MainImageBlob] nvarchar(max) NULL,
    [BgImageBlob] nvarchar(max) NULL,
    CONSTRAINT [PK_Products] PRIMARY KEY ([ProductId])
);
GO


CREATE TABLE [ProductTypes] (
    [TypeId] int NOT NULL IDENTITY,
    [Type] nvarchar(max) NULL,
    CONSTRAINT [PK_ProductTypes] PRIMARY KEY ([TypeId])
);
GO


CREATE TABLE [ProfileOptions] (
    [OptionId] int NOT NULL IDENTITY,
    [Option] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_ProfileOptions] PRIMARY KEY ([OptionId])
);
GO


CREATE TABLE [Roles] (
    [Id] nvarchar(450) NOT NULL,
    [Name] nvarchar(256) NULL,
    [NormalizedName] nvarchar(256) NULL,
    [ConcurrencyStamp] nvarchar(max) NULL,
    CONSTRAINT [PK_Roles] PRIMARY KEY ([Id])
);
GO


CREATE TABLE [Sliders] (
    [SliderId] int NOT NULL IDENTITY,
    [Title] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Sliders] PRIMARY KEY ([SliderId])
);
GO


CREATE TABLE [Tags] (
    [TagId] int NOT NULL IDENTITY,
    [Title] nvarchar(max) NULL,
    CONSTRAINT [PK_Tags] PRIMARY KEY ([TagId])
);
GO


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
GO


CREATE TABLE [Galleries] (
    [GalleryId] int NOT NULL IDENTITY,
    [ProductId] int NOT NULL,
    CONSTRAINT [PK_Galleries] PRIMARY KEY ([GalleryId]),
    CONSTRAINT [FK_Galleries_Products_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [Products] ([ProductId]) ON DELETE CASCADE
);
GO


CREATE TABLE [PromoProducts] (
    [PromoId] int NOT NULL IDENTITY,
    [ProductId] int NOT NULL,
    [DateAdded] datetime2 NOT NULL,
    CONSTRAINT [PK_PromoProducts] PRIMARY KEY ([PromoId]),
    CONSTRAINT [FK_PromoProducts_Products_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [Products] ([ProductId]) ON DELETE CASCADE
);
GO


CREATE TABLE [Stocks] (
    [StockId] int NOT NULL IDENTITY,
    [ProductId] int NOT NULL,
    [Quantity] int NOT NULL,
    CONSTRAINT [PK_Stocks] PRIMARY KEY ([StockId]),
    CONSTRAINT [FK_Stocks_Products_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [Products] ([ProductId]) ON DELETE CASCADE
);
GO


CREATE TABLE [Varieties] (
    [VarietyId] int NOT NULL IDENTITY,
    [ProductId] int NOT NULL,
    [Description] nvarchar(max) NULL,
    [ImageUrl] nvarchar(max) NULL,
    [ImageBlob] nvarchar(max) NULL,
    CONSTRAINT [PK_Varieties] PRIMARY KEY ([VarietyId]),
    CONSTRAINT [FK_Varieties_Products_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [Products] ([ProductId]) ON DELETE CASCADE
);
GO


CREATE TABLE [AspNetRoleClaims] (
    [Id] int NOT NULL IDENTITY,
    [RoleId] nvarchar(450) NOT NULL,
    [ClaimType] nvarchar(max) NULL,
    [ClaimValue] nvarchar(max) NULL,
    CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_AspNetRoleClaims_Roles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [Roles] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [SliderItems] (
    [SliderItemId] int NOT NULL IDENTITY,
    [SliderId] int NOT NULL,
    [ProductId] int NOT NULL,
    CONSTRAINT [PK_SliderItems] PRIMARY KEY ([SliderItemId]),
    CONSTRAINT [FK_SliderItems_Products_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [Products] ([ProductId]) ON DELETE CASCADE,
    CONSTRAINT [FK_SliderItems_Sliders_SliderId] FOREIGN KEY ([SliderId]) REFERENCES [Sliders] ([SliderId]) ON DELETE CASCADE
);
GO


CREATE TABLE [ProductTags] (
    [ProductTagId] int NOT NULL IDENTITY,
    [ProductId] int NOT NULL,
    [TagId] int NOT NULL,
    CONSTRAINT [PK_ProductTags] PRIMARY KEY ([ProductTagId]),
    CONSTRAINT [FK_ProductTags_Products_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [Products] ([ProductId]) ON DELETE CASCADE,
    CONSTRAINT [FK_ProductTags_Tags_TagId] FOREIGN KEY ([TagId]) REFERENCES [Tags] ([TagId]) ON DELETE CASCADE
);
GO


CREATE TABLE [Carts] (
    [CartId] int NOT NULL IDENTITY,
    [UserId] nvarchar(450) NOT NULL,
    CONSTRAINT [PK_Carts] PRIMARY KEY ([CartId]),
    CONSTRAINT [FK_Carts_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [Orders] (
    [OrderId] int NOT NULL IDENTITY,
    [UserId] nvarchar(450) NOT NULL,
    [Date] datetime2 NOT NULL,
    [OrderStatusId] int NOT NULL,
    [ShippingAddress] nvarchar(max) NOT NULL,
    [PaymentMethodId] int NOT NULL,
    [OrderNotes] nvarchar(max) NULL,
    [Total] decimal(18,2) NOT NULL,
    CONSTRAINT [PK_Orders] PRIMARY KEY ([OrderId]),
    CONSTRAINT [FK_Orders_OrderStatuses_OrderStatusId] FOREIGN KEY ([OrderStatusId]) REFERENCES [OrderStatuses] ([StatusId]) ON DELETE CASCADE,
    CONSTRAINT [FK_Orders_PaymentMethods_PaymentMethodId] FOREIGN KEY ([PaymentMethodId]) REFERENCES [PaymentMethods] ([PaymentMethodId]) ON DELETE CASCADE,
    CONSTRAINT [FK_Orders_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
);
GO


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
GO


CREATE TABLE [Testimonials] (
    [TestimonialId] int NOT NULL IDENTITY,
    [UserId] nvarchar(450) NOT NULL,
    [Comment] nvarchar(max) NOT NULL,
    [DateAdded] datetime2 NOT NULL,
    [Rating] int NOT NULL,
    CONSTRAINT [PK_Testimonials] PRIMARY KEY ([TestimonialId]),
    CONSTRAINT [FK_Testimonials_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [UserClaims] (
    [Id] int NOT NULL IDENTITY,
    [UserId] nvarchar(450) NOT NULL,
    [ClaimType] nvarchar(max) NULL,
    [ClaimValue] nvarchar(max) NULL,
    CONSTRAINT [PK_UserClaims] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_UserClaims_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [UserLogins] (
    [UserId] nvarchar(450) NOT NULL,
    [LoginProvider] nvarchar(max) NULL,
    [ProviderKey] nvarchar(max) NULL,
    [ProviderDisplayName] nvarchar(max) NULL,
    CONSTRAINT [PK_UserLogins] PRIMARY KEY ([UserId]),
    CONSTRAINT [FK_UserLogins_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [UserRoles] (
    [UserId] nvarchar(450) NOT NULL,
    [RoleId] nvarchar(450) NOT NULL,
    CONSTRAINT [PK_UserRoles] PRIMARY KEY ([UserId], [RoleId]),
    CONSTRAINT [FK_UserRoles_Roles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [Roles] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_UserRoles_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [UserTokens] (
    [UserId] nvarchar(450) NOT NULL,
    [LoginProvider] nvarchar(max) NULL,
    [Name] nvarchar(max) NULL,
    [Value] nvarchar(max) NULL,
    CONSTRAINT [PK_UserTokens] PRIMARY KEY ([UserId]),
    CONSTRAINT [FK_UserTokens_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [WishLists] (
    [WishListId] int NOT NULL IDENTITY,
    [UserId] nvarchar(450) NULL,
    CONSTRAINT [PK_WishLists] PRIMARY KEY ([WishListId]),
    CONSTRAINT [FK_WishLists_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
);
GO


CREATE TABLE [ItemGalleries] (
    [ItemGalleryId] int NOT NULL IDENTITY,
    [GalleryId] int NOT NULL,
    [ProductId] int NOT NULL,
    [ImageUrl] nvarchar(max) NULL,
    [ImageBlob] nvarchar(max) NULL,
    CONSTRAINT [PK_ItemGalleries] PRIMARY KEY ([ItemGalleryId]),
    CONSTRAINT [FK_ItemGalleries_Galleries_GalleryId] FOREIGN KEY ([GalleryId]) REFERENCES [Galleries] ([GalleryId]) ON DELETE CASCADE,
    CONSTRAINT [FK_ItemGalleries_Products_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [Products] ([ProductId])
);
GO


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
GO


CREATE TABLE [Discounts] (
    [DiscountId] int NOT NULL IDENTITY,
    [Description] nvarchar(max) NOT NULL,
    [OrderId] int NULL,
    CONSTRAINT [PK_Discounts] PRIMARY KEY ([DiscountId]),
    CONSTRAINT [FK_Discounts_Orders_OrderId] FOREIGN KEY ([OrderId]) REFERENCES [Orders] ([OrderId])
);
GO


CREATE TABLE [OrderProducts] (
    [OrderProductId] int NOT NULL IDENTITY,
    [OrderId] int NOT NULL,
    [ProductId] int NOT NULL,
    CONSTRAINT [PK_OrderProducts] PRIMARY KEY ([OrderProductId]),
    CONSTRAINT [FK_OrderProducts_Orders_OrderId] FOREIGN KEY ([OrderId]) REFERENCES [Orders] ([OrderId]) ON DELETE CASCADE,
    CONSTRAINT [FK_OrderProducts_Products_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [Products] ([ProductId]) ON DELETE CASCADE
);
GO


CREATE TABLE [WishListItems] (
    [WishListItemId] int NOT NULL IDENTITY,
    [WishListId] int NOT NULL,
    [ProductId] int NOT NULL,
    CONSTRAINT [PK_WishListItems] PRIMARY KEY ([WishListItemId]),
    CONSTRAINT [FK_WishListItems_Products_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [Products] ([ProductId]) ON DELETE CASCADE,
    CONSTRAINT [FK_WishListItems_WishLists_WishListId] FOREIGN KEY ([WishListId]) REFERENCES [WishLists] ([WishListId]) ON DELETE CASCADE
);
GO


IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
    SET IDENTITY_INSERT [Roles] ON;
INSERT INTO [Roles] ([Id], [ConcurrencyStamp], [Name], [NormalizedName])
VALUES (N'3a87bbeb-294c-4505-ba04-3940caf7d62e', NULL, N'Administrator', N'ADMINISTRATOR'),
(N'5631e46a-0f85-4547-9226-1409e1659317', NULL, N'User', N'USER');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ConcurrencyStamp', N'Name', N'NormalizedName') AND [object_id] = OBJECT_ID(N'[Roles]'))
    SET IDENTITY_INSERT [Roles] OFF;
GO


CREATE INDEX [IX_AspNetRoleClaims_RoleId] ON [AspNetRoleClaims] ([RoleId]);
GO


CREATE INDEX [IX_CartItems_CartId] ON [CartItems] ([CartId]);
GO


CREATE INDEX [IX_CartItems_ProductId] ON [CartItems] ([ProductId]);
GO


CREATE UNIQUE INDEX [IX_Carts_UserId] ON [Carts] ([UserId]);
GO


CREATE INDEX [IX_Discounts_OrderId] ON [Discounts] ([OrderId]);
GO


CREATE INDEX [IX_Galleries_ProductId] ON [Galleries] ([ProductId]);
GO


CREATE INDEX [IX_ItemGalleries_GalleryId] ON [ItemGalleries] ([GalleryId]);
GO


CREATE INDEX [IX_ItemGalleries_ProductId] ON [ItemGalleries] ([ProductId]);
GO


CREATE INDEX [IX_OrderProducts_OrderId] ON [OrderProducts] ([OrderId]);
GO


CREATE INDEX [IX_OrderProducts_ProductId] ON [OrderProducts] ([ProductId]);
GO


CREATE INDEX [IX_Orders_OrderStatusId] ON [Orders] ([OrderStatusId]);
GO


CREATE INDEX [IX_Orders_PaymentMethodId] ON [Orders] ([PaymentMethodId]);
GO


CREATE INDEX [IX_Orders_UserId] ON [Orders] ([UserId]);
GO


CREATE INDEX [IX_ProductReviews_ProductId] ON [ProductReviews] ([ProductId]);
GO


CREATE INDEX [IX_ProductReviews_UserId] ON [ProductReviews] ([UserId]);
GO


CREATE INDEX [IX_ProductTags_ProductId] ON [ProductTags] ([ProductId]);
GO


CREATE INDEX [IX_ProductTags_TagId] ON [ProductTags] ([TagId]);
GO


CREATE INDEX [IX_PromoProducts_ProductId] ON [PromoProducts] ([ProductId]);
GO


CREATE UNIQUE INDEX [RoleNameIndex] ON [Roles] ([NormalizedName]) WHERE [NormalizedName] IS NOT NULL;
GO


CREATE INDEX [IX_SliderItems_ProductId] ON [SliderItems] ([ProductId]);
GO


CREATE INDEX [IX_SliderItems_SliderId] ON [SliderItems] ([SliderId]);
GO


CREATE INDEX [IX_Stocks_ProductId] ON [Stocks] ([ProductId]);
GO


CREATE INDEX [IX_Testimonials_UserId] ON [Testimonials] ([UserId]);
GO


CREATE INDEX [IX_UserClaims_UserId] ON [UserClaims] ([UserId]);
GO


CREATE INDEX [IX_UserRoles_RoleId] ON [UserRoles] ([RoleId]);
GO


CREATE INDEX [EmailIndex] ON [Users] ([NormalizedEmail]);
GO


CREATE UNIQUE INDEX [UserNameIndex] ON [Users] ([NormalizedUserName]) WHERE [NormalizedUserName] IS NOT NULL;
GO


CREATE INDEX [IX_Varieties_ProductId] ON [Varieties] ([ProductId]);
GO


CREATE INDEX [IX_WishListItems_ProductId] ON [WishListItems] ([ProductId]);
GO


CREATE INDEX [IX_WishListItems_WishListId] ON [WishListItems] ([WishListId]);
GO


CREATE INDEX [IX_WishLists_UserId] ON [WishLists] ([UserId]);
GO


