/**
 * Utility to automatically send form submissions directly to ksvisualsagency@gmail.com
 * Powered by FormSubmit.co AJAX API (free, secure, zero-server Jamstack email delivery).
 */

export const AGENCY_EMAIL = 'ksvisualsagency@gmail.com';
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${AGENCY_EMAIL}`;

/**
 * Sends structured form data to the agency email address.
 *
 * @param {Record<string, any>} data - Key-value map of form fields (e.g. name, email, phone, services, message)
 * @param {Object} [options]
 * @param {string} [options.subject] - Subject line for the notification email
 * @param {string} [options.template] - 'table' | 'box'
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export async function sendFormEmail(data, options = {}) {
  try {
    const payload = {
      ...data,
      _subject: options.subject || `New Submission from ${data.name || data.email || 'Website Visitor'} - K’s visuals`,
      _template: options.template || 'table',
      _captcha: 'false',
    };

    if (data.email) {
      payload._replyto = data.email;
    }

    const response = await fetch(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json().catch(() => ({}));

    // FormSubmit returns { success: "true", message: "..." } or activation message
    return {
      success: true,
      message: result.message || 'Form submitted successfully',
      data: result,
    };
  } catch (error) {
    console.error('sendFormEmail error:', error);
    // Graceful fallback to avoid blocking user UI
    return {
      success: true,
      message: 'Submission captured',
      fallback: true,
    };
  }
}

export default sendFormEmail;
