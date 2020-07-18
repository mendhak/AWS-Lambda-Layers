
Example repo to show Lambda development locally as well as in AWS.  The sample NodeJS code is in [lambda/index.js](lambda/index.js).  

The payload the Lambda expects is in the `event` object, in this case it's `event.markdown`, which is passed to the `markdown-it` library. 


# Running the Lambda in AWS


## Setup

Clone this project, and `npm install`.  

Get yourself some AWS credentials against your account -  either an IAM or temporary credentials.

Create a Lambda role if it doesn't already exist:

```
aws iam create-role --role-name lambda-ex --assume-role-policy-document file://trust-policy.json
```

Make note of the Role ARN that comes back, you'll need it later. 

## Deploy 

Create a zip file for the lambda: 

```
zip -r myfunction.zip .
```

Create your lambda function with the zip.  Substitute the Role ARN here. 

```
aws lambda create-function --region eu-west-1 --function-name my-function --zip-file fileb://myfunction.zip --handler lambda/index.handler --runtime nodejs12.x --role arn:aws:iam::123456789012:role/lambda-ex
```

Or update the existing function: 

```
aws lambda update-function-code --region eu-west-1 --function-name my-function --zip-file fileb://myfunction.zip
```

## Run

Now invoke the function: 

```
aws lambda invoke --function-name my-function outype Tail --payload '{ "markdown": "# Bob" }' --cli-binary-format raw-in-base64-out
```

And look inside `outfile.txt` for the resulting HTML.  


## Clean up

Remove the function that you created. 

```
aws lambda delete-function --function-name my-function
```


# Running the Lambda locally

## Setup

Clone this project, and `npm install`.  


## Start the container

Use the [`lambci/lambda`](https://github.com/lambci/docker-lambda) image to run Lambda functions for local development.  
This is the same image used by AWS SAM, LocalStack and Serverless.  Minus the overhead.  

Run the container

```
docker-compose up
```

## Run

Then in another terminal, invoke the function, and inspect the outfile. 

```
aws lambda invoke --endpoint http://localhost:9001 --region eu-west-1 --no-sign-request --function-name myfunction --payload '{"markdown":"# Hello World!"}' --cli-binary-format raw-in-base64-out outfile.txt

cat outfile.txt

```

You can also invoke it directly using curl

```
curl -d '{"markdown":" ## Hello, World"}' http://localhost:9001/2015-03-31/functions/myfunction/invocation
```


## Clean up

Just stop and remove the container

```
docker-compose stop   # Or Ctrl+C 
docker-compose rm
```



