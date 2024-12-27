#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import {
  EcommerceApiStack,
  ProductsAppStack,
  ProductsAppLayersStack,
} from "../lib/index";
import * as dotenv from "dotenv";
dotenv.config();

const app = new cdk.App();

const env: cdk.Environment = {
  account: process.env.ACCOUNT_ID_AWS,
  region: process.env.AWS_REGION,
};

const tags = {
  cost: "ecommerce",
  team: "mathTeam",
};

const productsAppLayersStack = new ProductsAppLayersStack(
  app,
  "ProductsAppLayers",
  {
    tags,
    env,
  }
);

const productsAppStack = new ProductsAppStack(app, "ProductsApp", {
  tags,
  env,
});
productsAppStack.addDependency(productsAppLayersStack);

const ecommerceApiStack = new EcommerceApiStack(app, "EcommerceApi", {
  productsFetchHandler: productsAppStack.productsFetchHandler,
  productsAdminHandler: productsAppStack.productsAdminHandler,
  tags,
  env,
});
ecommerceApiStack.addDependency(productsAppStack);