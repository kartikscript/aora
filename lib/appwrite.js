import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';
export const config={
  endpoint:'https://cloud.appwrite.io/v1',
  platform:'com.suk.aora',
  projectId:'66b08dd80008a3989eb7',
  databaseId:'66b090550016e7a64d2f',
  userCollectionId:'66b09081003a067478b0',
  videoCollectionId:'66b090e2003aad2f999b',
  storageCollectionId:'66b1bf6a0004f2450a78'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client)
const databases= new Databases(client);
const storage = new Storage(client)
// Register User
export const createUser= async (email,password,username)=>{
  try {
    // register a new account for a user
    const newAccount= await account.create(
      ID.unique(),
      email,
      password,
      username,
    )
    if(!newAccount) throw Error
    // set a avatar for profile photo
    const avatarUrl=avatars.getInitials(username)
    //to log in a user , there must be a session provided
    await signIn(email,password)
    //now saving user's all information in database
    const newUser= await databases.createDocument(
      config.databaseId, //specifying which database we are recording
      config.userCollectionId,// which collection we want to put
      ID.unique(),
      {
        accountId:newAccount.$id,
        email,
        username,
        avatar:avatarUrl
      },
    )
    return newUser
  } catch (error) {
    console.log(error);
    throw new Error(error)
  }
}

export const signIn=async (email,password)=>{
  try {

    const session =await account.createEmailPasswordSession(email,password)
    return session
  } catch (error) {
    console.log(error)
  }
}

export const getCurrentUser = async () =>{
  try {
    //current logged in user details
    const currentAccount = await account.get();
    if(!currentAccount) throw Error

    //searching for the current logged in user in database
    const currentUser=await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountId',currentAccount.$id)]
    )
    if(!currentUser) throw Error

    return currentUser.documents[0]
  } catch (error) {
    console.log(error)
  }
}

export const getAllPosts= async ()=>{
  try {
    const posts= await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      
    )
    return posts.documents
  } catch (error) {
    throw new Error(error)
  }
}

export const getLatestPosts= async ()=>{
  try {
    const posts= await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderAsc('$createdAt',Query.limit(7))]
    )
    return posts.documents
  } catch (error) {
    throw new Error(error)
  }
}
export const searchPosts= async (query)=>{
  try {
    const posts= await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.search('title',query)]
    )
    return posts.documents
  } catch (error) {
    throw new Error(error)
  }
}
export const getUserPosts= async (userId)=>{
  try {
    const posts= await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.search('creator',userId)]
    )
    return posts.documents
  } catch (error) {
    throw new Error(error)
  }
}

export const signOut = async ()=>{
  try {
    const session =await  account.deleteSession('current')
    return session
  } catch (error) {
    throw new Error(error)
  }
}

/////

export const getFilePreview= async (fileId, type)=>{
  let fileUrl;
  try {
    if(type==='video') {
      fileUrl= storage.getFileView(config.storageCollectionId,fileId)
    } else if(type==='image') {
      fileUrl= storage.getFilePreview(config.storageCollectionId,fileId,2000,2000,'top',100)
    } else {
      throw new Error('Invalid file type')
    }

    if(!fileUrl) throw Error
    return fileUrl
  } catch (error) {
    throw new Error(error)
  }
}
export const uploadFile =async (file,type)=>{
  if(!file) return

  const {mimeType,...rest} =file
  const asset = {type:mimeType, ...rest}//taken all variables and renamed mymetype to type

  try {
    const uploadedFile = await storage.createFile(
      config.storageCollectionId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type)
  } catch (error) {
    throw new Error(error)
    
  }
}

export const createVideo = async (form) => {
    try {
      const [thumbnailUrl,videoUrl]= await Promise.all([
        uploadFile(form.thumbnail, 'image'),
        uploadFile(form.video, 'video')
      ])

      const newPost = await databases.createDocument(
        config.databaseId,
        config.videoCollectionId,
        ID.unique(),
        {
          title:form.title,
          thumbnail:thumbnailUrl,
          video:videoUrl,
          prompt:form.prompt,
          creator:form.userId
        }
      )
    } catch (error) {
      throw new Error(error)
    }
}