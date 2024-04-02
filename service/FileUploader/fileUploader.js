const fs = require("fs");
const { v4: uuidV4 } = require("uuid");
const sharp = require("sharp");

let uploadFile = async (file) => {
  try {
    const resourceBasePath = process.env.RESOURCE_PATH;
    let uniqueId = uuidV4();
    let fileMimeType = file.mimetype.split("/");
    let fileFormat = fileMimeType[fileMimeType.length - 1];
    let folderPath = "";
    if (fileMimeType[0].startsWith("image")) {
      folderPath = "resources/img";
    }else {
      return { error: "Unsupported file type" };
    }
    let filePath = `${resourceBasePath}/${folderPath}/${uniqueId}.${fileFormat}`;

    await fs.promises.mkdir(resourceBasePath + "/" + folderPath, {
      recursive: true,
    });

    if (fileMimeType[0].startsWith("image")) {
      let compressedBuffer = file.buffer;
      let compressedSize = compressedBuffer.length;
      let targetSize = 500 * 1024;

      let quality = 100;

      while (compressedSize > targetSize && quality >= 10) {
        compressedBuffer = await sharp(compressedBuffer)
          .resize({ width: 800 })
          .jpeg({ quality })
          .toBuffer();

        compressedSize = compressedBuffer.length;
        quality -= 10;
      }

      const previewFolderpath = `${folderPath}/preview`;

      await fs.promises.mkdir(resourceBasePath + "/" + previewFolderpath, {
        recursive: true,
      });

      const previewFilePath = `${resourceBasePath}/${previewFolderpath}/${uniqueId}.${fileFormat}`;

      const previewQuality = 50;
      await sharp(compressedBuffer)
        .resize({ width: 20 })
        .jpeg({ previewQuality })
        .toFile(previewFilePath);
      file.buffer = compressedBuffer;
    }

    await fs.promises.writeFile(filePath, file.buffer);
    console.log("File uploaded successfully");

    return {
      path: `${folderPath}/${uniqueId}.${fileFormat}`,
      fileType: fileFormat,
      key: uniqueId,
    };
  } catch (err) {
    return { error: err };
  }
};

const compressImagesInDirectory = async (directoryPath) => {
  try {
    const files = await fs.promises.readdir(directoryPath);

    for (const file of files) {
      const filePath = `${directoryPath}/${file}`;
      const stats = await fs.promises.stat(filePath);

      if (stats.isFile() && stats.size > 500 * 1024) {
        await compressImage(filePath);
      }

      await createPreviewImage(filePath);
    }
  } catch (err) {
    console.error("Error compressing images:", err);
  }
};

const createPreviewImage = async (filePath) => {
  try {
    const previewDir = `${process.env.RESOURCE_PATH}/resources/img/preview`;
    const previewFilePath = filePath.replace(
      `${process.env.RESOURCE_PATH}/resources/img`,
      previewDir
    );

    await fs.promises.mkdir(previewDir, { recursive: true });

    await sharp(filePath)
      .resize({ width: 20 })
      .jpeg({ quality: 50 })
      .toFile(previewFilePath);

    console.log(`Preview image created successfully: ${previewFilePath}`);
  } catch (err) {
    console.error(`Error creating preview image: ${filePath}`, err);
  }
};

const compressImage = async (filePath) => {
  try {
    const targetSize = 500 * 1024;
    const imageBuffer = await fs.promises.readFile(filePath);
    let compressedBuffer = imageBuffer;
    let compressedSize = compressedBuffer.length;

    let quality = 90;

    while (compressedSize > targetSize && quality >= 10) {
      compressedBuffer = await sharp(compressedBuffer)
        .resize({ width: 800 })
        .jpeg({ quality })
        .png({ force: false })
        .toBuffer();

      compressedSize = compressedBuffer.length;
      quality -= 10;
    }

    if (compressedSize < imageBuffer.length) {
      await fs.promises.writeFile(filePath, compressedBuffer);
      console.log(`Image compressed successfully: ${filePath}`);
    } else {
      console.log(`Image size is already within the limit: ${filePath}`);
    }
  } catch (err) {
    console.error(`Error compressing image: ${filePath}`, err);
  }
};

module.exports = { uploadFile, compressImagesInDirectory };
