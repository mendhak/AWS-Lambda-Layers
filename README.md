


Clone this project, and `npm install`.  


Get some AWS credentials, eg using `aws-adfs`

```
docker run -it --rm mendhak/aws-adfs login --adfs-host=adfs.example.com --printenv --region eu-west-1 --output-format text --no-sspi
```

Create a Lambda role if it doesn't already exist.

```
aws iam create-role --role-name lambda-ex --assume-role-policy-document file://trust-policy.json
```

Make note of the Role ARN that comes back.

Create a zip file for the lambda

```
zip -r myfunction.zip .
```

Create your lambda function with the zip

```
aws lambda create-function --region eu-west-1 --function-name my-function --zip-file fileb://myfunction.zip --handler lambda/index.handler --runtime nodejs12.x --role arn:aws:iam::123456789012:role/lambda-ex
```

Or update the existing function. 

```
aws lambda update-function-code --region eu-west-1 --function-name my-function --zip-file fileb://myfunction.zip
```

Now invoke the function

```
aws lambda invoke --function-name my-function outype Tail --payload '{ "markdown": "# Bob" }' --cli-binary-format raw-in-base64-out
```

And look inside `outfile.txt` for the resulting HTML.  


