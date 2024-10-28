import React from 'react';

const HomePage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>WELCOME TO THE ONLINE YOGA CLASS</h1>
      <p>
        Yoga is essentially a spiritual discipline based on an extremely subtle science, which focuses on bringing harmony between mind and body. It is an art and science of healthy living.
      </p>

      {/* Image Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginTop: '20px'
      }}>
        {/* First image */}
        <img
          src="https://yogaandhappiness.in/wp-content/uploads/2023/12/2c305468-083c-4e71-9450-be7f4d215912.jpeg"
          alt="Yoga Class"
          style={{ width: '100%', height: '300px' }}
        />

        {/* Second image */}
        <img
          src="https://www.doconline.com/assets/image/blog/yoga.jpg"
          alt="Yoga Practice"
          style={{ width: '100%', height: '300px' }}
        />

        {/* Third image */}
        <img
          src="https://domf5oio6qrcr.cloudfront.net/medialibrary/11643/3f2b5911-6e46-4447-b569-804eef0cfe32.png"
          alt="Yoga Pose"
          style={{ width: '100%', height: '300px' }}
        />

        {/* Fourth image */}
        <img
          src="https://image.myupchar.com/5247/webp/yoga-in-hindi.webp"
          alt="Yoga in Hindi"
          style={{ width: '100%', height: '300px' }}
        />
      </div>

      <h1>TERMS AND CONDITIONS</h1>
      <p >
        1. Introduction
        Welcome to the Yoga E-commerce Dashboard. These Terms and Conditions govern your access and use of our platform, including any content, functionality, and services offered. By using the Dashboard, you agree to comply with these Terms and Conditions.

        <br />2. Eligibility
        You must be at least 18 years old to use this platform. By using the Dashboard, you represent and warrant that you meet all eligibility requirements.<br /><br />

        <br />3. Account Registration and Security
        Users must register for an account to access certain features of the platform. You are responsible for maintaining the confidentiality of your account information, including your password. Any unauthorized access or use of your account must be reported to us immediately. We reserve the right to suspend or terminate accounts that are suspected of being compromised or violated.<br /><br />

        <br />4. Admin Rights and Responsibilities
        Administrators have special privileges within the platform, including the ability to manage users, upload content, and view metrics. Admins are responsible for ensuring that any content uploaded (videos, images, text) complies with copyright laws and does not infringe on third-party rights. Admin actions, such as deleting or modifying user data, must comply with the platform’s policies and legal requirements.<br /><br />

        <br />5. User Data and Privacy
        We are committed to protecting your personal data. All information provided during registration and use of the platform is subject to our Privacy Policy. By using the Dashboard, you consent to the collection and use of your information in accordance with the Privacy Policy.<br /><br />

        <br />6. Content Uploads and Intellectual Property
        Any content uploaded (e.g., videos, images, tutorials) must be owned by you or you must have the appropriate permissions to upload and share the content. By uploading content, you grant us a non-exclusive, royalty-free license to host, store, and display your content on our platform. We reserve the right to remove any content that violates these Terms and Conditions, infringes upon intellectual property rights, or is deemed inappropriate.<br /><br />

        <br />7. Prohibited Activities
        You agree not to engage in any of the following activities: Use the platform for any illegal or unauthorized purposes. Upload, post, or transmit any content that is harmful, offensive, or violates the rights of others. Disrupt the platform or attempt to access any restricted areas without authorization. Use the platform to distribute malware, viruses, or any other harmful software.<br /><br />

        <br />8. Payment and Subscriptions
        All users must have a valid subscription to access paid content, including recorded yoga sessions, live classes, and tutorials. All payments made through the platform are subject to the terms of our payment processor. We reserve the right to modify prices, subscription plans, or any other fees associated with the platform at any time. Any changes will be communicated to you before they take effect.<br /><br />

        <br />9. Refund Policy
        Subscription fees are non-refundable unless otherwise specified in specific promotional terms or by applicable law. If you experience issues with your subscription, please contact our support team for assistance.<br /><br />

        <br />10. Termination
        We reserve the right to terminate or suspend your access to the platform at our discretion, without prior notice, for any violation of these Terms and Conditions. Upon termination, your right to use the platform will immediately cease. Any provisions of the Terms and Conditions that by their nature should survive termination shall survive.<br /><br />

        <br />11. Limitation of Liability
        We strive to provide a secure and stable platform, but we do not guarantee that the platform will always function without errors or interruptions. In no event will we be liable for: Any indirect, consequential, or punitive damages arising from your use of the platform. Loss of data, profits, or revenue due to system outages, unauthorized access, or any other related events.<br /><br />

        <br />12. Changes to Terms and Conditions
        We may modify or update these Terms and Conditions from time to time. You are encouraged to review these Terms periodically. Continued use of the platform after any changes signifies your acceptance of the new terms.<br /><br />

        <br />13. Governing Law
        These Terms and Conditions shall be governed and interpreted in accordance with the laws of [Your Country/State]. Any legal disputes arising from your use of the platform shall be subject to the exclusive jurisdiction of the courts in [Your Country/State].<br /><br />

        <br />14. Contact Information
        If you have any questions or concerns regarding these Terms and Conditions, please contact us at [your contact email or support details].
      </p>
    </div>
  );
};

export default HomePage;
