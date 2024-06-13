Waggly dog walking Project. 

The following link gives access to the waqq.ly prototype. 

Website URL: https://delightful-desert-0e7901b03.5.azurestaticapps.net





If needed how to deply to cloud: 

//Configure the Static Web App

Create the Static Web App in Azure:

Step 1: Configure the Static Web App

Create the Static Web App in Azure:

Log in to the Azure portal.
Navigate to "Create a resource" and select "Static Web App".
Provide the necessary details such as Resource Group, Static Web App Name, and Region. Select "Other" as the source and choose "Custom" for build presets.
Review the configurations and click "Create".

Deploy the Frontend:

Clone the Waggly project repository to your local machine.
Open the project in your code editor.
Ensure the HTML, CSS, and JavaScript files are in the correct directory.
Push the updated files to your GitHub repository.
In the Azure portal, go to your Static Web App and link it to your GitHub repository.
Configure the branch and folder for the build, then save the settings.

Step 2: Set Up Azure Functions

Create a Function App:

In the Azure portal, search for "Function App" and click "Create".
Fill in details like Resource Group, Function App Name, and select Node.js as the runtime stack.
Choose the same region as the Static Web App and create the Function App.
Deploy the Functions:

Open a terminal and navigate to the backend directory of your project.
Initialize the function app using Azure Functions Core Tools: 

in terminal: func init 
Create new HTTP trigger functions for adding and retrieving data.
Update the function files with the logic for your project.
Publish the functions to Azure:
in terminal: func azure functionapp publish (app name)


Step 3: Configure Cosmos DB

Create a Cosmos DB Account:

In the Azure portal, search for "Azure Cosmos DB" and click "Create".
Fill in the required details like Resource Group, Account Name, and API type (Core SQL).
Select the same region and create the account.
Set Up the Database and Containers:

Navigate to your Cosmos DB account and open the Data Explorer.
Create a new database named WagglyDB.
Within this database, create containers named Dogs and Walkers with partition keys /DogID and /WalkerID respectively.
Link Cosmos DB with Azure Functions:

In your Function App, go to "Configuration" under "Settings".
Add a new application setting named COSMOS_DB_CONNECTION_STRING with the value being your Cosmos DB connection string (found under "Keys").
Update your function code to use this environment variable for connecting to Cosmos DB.