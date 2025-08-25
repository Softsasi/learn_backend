import { appConfig } from '@/config/appConfig';
import EditPostForm from '../../_componnets/EditPostForm';
import { Post } from '../../page';

// {{app_url}}/post/68ac32b6bbeed7b348c39b31

const EditPage = async ({ params }: { params: { id: string } }) => {
  const { id: postId } = await params;
  const postUrl = `${appConfig.backend_Url}/post/${postId}`;

  const response = await fetch(postUrl);
  const post = (await response.json()) as Post;

  return (
    <div>
      <EditPostForm post={post} />
    </div>
  );
};

export default EditPage;
