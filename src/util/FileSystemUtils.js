import * as FileSystem from 'expo-file-system';
import {EncodingType} from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import {Linking} from 'react-native';

const getFileNameFromResponseHeader = (contentDisposition) => {
  let filename = undefined;
  if (contentDisposition && contentDisposition.indexOf('inline') !== -1) {
    var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    var matches = filenameRegex.exec(contentDisposition);
    if (matches != null && matches[1]) {
      filename = matches[1].replace(/['"]/g, '');
    }
  }
  return filename;
};

const blobToBase64 = (blob) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve) => {
    reader.onload = () => {
      resolve(reader.result.split(',')[1]);
    };
  });
};

const downloadFile = async (fileUrl) => {
  var requestOptions = {
    method: 'GET',
    credentials: 'omit',
  };

  return fetch(fileUrl, {...requestOptions})
    .then(async (response) => {
      const fileName = getFileNameFromResponseHeader(
        response.headers.get('content-disposition'),
      );
      const file = await response.blob();
      return {fileName, file};
    })
    .then(async ({fileName, file}) => {
      blobToBase64(file).then(async (res) => {
        const fileUri =
          FileSystem.documentDirectory +
          `${fileName ? encodeURI(fileName) : `${new Date().valueOf()}.pdf`}`;

        await FileSystem.writeAsStringAsync(fileUri, res, {
          encoding: EncodingType.Base64,
        });

        Sharing.shareAsync(fileUri);
      });
    })
    .catch((error) => console.log('error', error));
};

const openFileLink = (url) => Linking.openURL(url);

export {downloadFile, openFileLink};
