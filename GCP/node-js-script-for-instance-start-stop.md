```
for detail: https://cloud.google.com/scheduler/docs/start-and-stop-compute-engine-instances-on-a-schedule#console_2
```
Set up the Compute Engine instance
```
Go to the VM instances page in the Google Cloud console.
Go to the VM instances page.
Click Create instance.
Set the Name to dev-instance.
Under Labels, click Add labels.
Click Add label.
Enter env for Key and dev for Value.
For Region select us-west1.
For Zone select us-west1-b.
Click Save.
Click Create at the bottom of the page.
```
Deploy functions triggered by Pub/Sub through Cloud Functions
```
Create the start function.
Go to the Cloud Functions page in the Google Cloud console.
Go to the Cloud Functions page.
Click Create Function.
Set Function name to startInstancePubSub.
Leave Region at its default value.
For Trigger type, select Cloud Pub/Sub.
For Select a Cloud Pub/Sub topic, select Create a topic....
A New pub/sub topic dialog box should appear.
Under Topic ID, enter start-instance-event.
Click Create Topic to finish the dialog box.
Click Save at the bottom of the Trigger box.
Click Next at the bottom of the page.
For Runtime, select Node.js 10.
For Entry point, enter startInstancePubSub.
On the left side of the code editor, select index.js.
Replace the starter code with the following code:

On the left side of the code editor, select the package.json.

Replace the starter code with the following code:
Click Deploy at the bottom of the page.
https://github.com/GoogleCloudPlatform/nodejs-docs-samples/blob/HEAD/functions/scheduleinstance/index.js

```
Create the stop function.

```
You should be on the Cloud Functions page in the Google Cloud console.
Click Create Function.
Set Function name to stopInstancePubSub.
Leave Region at its default value.
Leave Memory allocated at its default value.
For Trigger type, select Cloud Pub/Sub.
For Select a Cloud Pub/Sub topic, select Create a topic....
A New pub/sub topic dialog box should appear.
Under Topic ID, enter stop-instance-event.
Click Create Topic to finish the dialog box.
Click Save at the bottom of the Trigger box.
Click Next at the bottom of the page.
For Runtime, select Node.js 10.
For Entry point, enter stopInstancePubSub.
On the left side of the code editor, select index.js.
Replace the starter code with the following code:

On the left side of the code editor, select the package.json.

Replace the starter code with the following code:
Click Deploy at the bottom of the page.

```

(Optional) Verify the functions work
```
Go to the Cloud Functions page in the Google Cloud console.
Go to the Cloud Functions page.
Click on the function named stopInstancePubSub.
You should see a number of tabs: General, Trigger, Source, Permissions, and Testing. Click on the Testing tab.
For Triggering event enter the following:


{"data":"eyJ6b25lIjoidXMtd2VzdDEtYiIsICJsYWJlbCI6ImVudj1kZXYifQo="}
This is simply the base64-encoded string for {"zone":"us-west1-b", "label":"env=dev"}

If you want to encode your own string, feel free to use any online base64 encoding tool.

Note: If you want to learn more about publishing data to Pub/Sub, see the Publisher Guide.
Click the Test the function button.
```

Set up the Cloud Scheduler jobs to call Pub/Sub
```
Create the start job.
Go to the Cloud Scheduler page in the Google Cloud console.
Go to the Cloud Scheduler page.
Click Create a job.
Leave the default region.
Set the Name to startup-dev-instances.
For Frequency, enter 0 9 * * 1-5.
This will execute at 9:00 every day Mon-Fri.
For Timezone, select your desired country and timezone. This example will use United States and Los Angeles.
Click Continue.
For Target type, select Pub/Sub.
Select start-instance-event from the topic dropdown.
For Message, enter the following:

{"zone":"us-west1-b","label":"env=dev"}
Click Create.


Create the stop job.
You should be on the Cloud Scheduler page in the Google Cloud console.
Click Create Job.
Leave the default region and click Next at the bottom of the page.
Set the Name to shutdown-dev-instances.
For Frequency, enter 0 17 * * 1-5.
This will execute at 17:00 every day Mon-Fri.
For Timezone, select your desired country and timezone. This example will use United States and Los Angeles.
Click Continue.
For Target type, select Pub/Sub.
Select stop-instance-event from the topic dropdown..
For Message, enter the following:

{"zone":"us-west1-b","label":"env=dev"}
Click Create.
```







