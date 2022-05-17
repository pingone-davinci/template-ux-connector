/* 
  This manifest includes a bare bones UX example
  customHtml, customCss, and customScript are DaVinci natives
  used to present the page
*/

const customHtml = `
<div class="content" style="padding: 30px">
<div class="heading">FauxAuth Will Continue In:</div>
<p id="countdown"></p>
<div class="hidden">
    <form id="skForm">
        <input id="skinput-response" type="hidden" name="response" value=""/>
        <button data-skform="skForm" data-skbuttontype="form-submit" data-skbuttonvalue="submit" data-skvalue="submit" id="skbutton" data-skcomponent="skbutton" type="button"/></button>
    </form>
</div>
`;

const customCss = `
.hidden {
  display: none;
}
`;

const customScript = `
// var countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();

var countDownDate = (new Date().getTime()) + 6000;
// var countDownDate = new Date().getTime();
// Update the count down every 1 second
var x = setInterval(function() {

  // Set up countdown
  var now = new Date().getTime();
  var distance = countDownDate - now;
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  // TODO - add example for using an input property or global property. 
  document.getElementById("countdown").innerHTML = seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    // These lines trigger the handle_capability_countdownCheck_continue
    document.getElementById('skinput-response').value = "completed";
    document.getElementById('skbutton').click();
  }
}, 1000);
`;

const connectorUX = {
  name: 'UX Connector',
  description: 'Pretend to enter credentials in an app.',
  connectorId: 'connectorUX',
  serviceName: 'connector-ux',
  connectorType: 'example',
  connectorCategories: [{ name: 'Authenticate', value: 'authenticate' }],
  connectorDetails: 'Show a simple countdown before continuing',
  detailImage: null,
  metadata: {
    colors: {
      canvas: '#eff0f2',
      dark: '#3a4b65',
    },
    logos: {
      canvas: {
        imageFileName: 'screen.svg',
      },
    },
  },
  sections: [{ name: 'General', value: 'general', default: true }],
  flowSections: [{ name: 'General', value: 'general' }],

  properties: {
    /* 
      customHtml, customCss, and customScript must included as propeties
      but do not need to be presented on the connection. 
      If included in accountConfigView or flowConfigView, 
      it will be customizable.
    */
    customHTML: {
      displayName: 'HTML Template',
      preferredControlType: 'textArea',
      value: customHtml,
    },

    customCSS: {
      displayName: 'CSS',
      preferredControlType: 'codeEditor',
      value: customCss,
      language: 'css',
    },

    customScript: {
      displayName: 'Script',
      preferredControlType: 'codeEditor',
      value: customScript,
      language: 'javascript',
    },

    deviceId: {
      displayName: 'Device ID',
      info: 'Unique ID of the current device',
      preferredControlType: 'textField',
    },

    screenTemplateName: {},
  },

  capabilities: {
    countdownCheck: {
      type: 'action',
      title: 'Countdown Check',
      subTitle: 'Count down FauxAuth',
      respondToUser: true,
      userViews: [
        {
          screenTemplateName: 'CustomHTMLTemplate',
          items: [
            { propertyName: 'customHTML' },
            { propertyName: 'customCSS' },
            { propertyName: 'customScript' },
          ],
        },
      ],
      flowConfigView: {
        items: [],
      },
      payloadInputSchema: {
        default: {
          type: 'object',
          properties: {
            properties: {
              type: 'object',
              properties: {},
            },
          },
        },
      },
      localOutputSchema: {
        output: {
          type: 'object',
          properties: {
            rawResponse: {
              type: 'object',
            },
            statusCode: {
              type: 'number',
            },
            deviceDetails: {
              type: 'object',
              properties: {
                status: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  },
  accountConfigView: {
    items: [
      { propertyName: 'clientID' },
      { propertyName: 'clientSecret' },
      { propertyName: 'maDomain' },
      { propertyName: 'crossDomainApiPort' },
    ],
  },
};

module.exports = connectorUX;
