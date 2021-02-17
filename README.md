# fantasy-x

A fantasy gaming application similar to fantasy football but geared towards the e-sports scene.

# Deploy External Adapter:
- Install gcloud
- `yarn install serverless`
- `yarn install --save serverless-plugin-scripts`

# Test:
`curl -X POST <YOUR_CLOUD_FUNCTION_URL>
-H "Content-Type:application/json"  -d '{"id": "1", {"data": "account_id": "70388657", "stat": "rank_tier"}}'`
