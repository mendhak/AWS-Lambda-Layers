


Clone this project, and `npm install`.  

Get yourself some AWS credentials against your account -  either an IAM or temporary credentials.

Create a Lambda role if it doesn't already exist:

```
aws iam create-role --role-name lambda-ex --assume-role-policy-document file://trust-policy.json
```

Make note of the Role ARN that comes back.

Create a zip file for the lambda: 

```
zip -r myfunction.zip .
```

Create your lambda function with the zip: 

```
aws lambda create-function --region eu-west-1 --function-name my-function --zip-file fileb://myfunction.zip --handler lambda/index.handler --runtime nodejs12.x --role arn:aws:iam::123456789012:role/lambda-ex
```

Or update the existing function: 

```
aws lambda update-function-code --region eu-west-1 --function-name my-function --zip-file fileb://myfunction.zip
```

Now invoke the function: 

```
aws lambda invoke --function-name my-function outype Tail --payload '{ "markdown": "# Bob" }' --cli-binary-format raw-in-base64-out
```

And look inside `outfile.txt` for the resulting HTML.  


## Notes

The code that's executed is in [lambda/index.js](lambda/index.js).  

The payload is in the `event` object, in this case it's `event.markdown`, which is passed to the `markdown-it` library. 

