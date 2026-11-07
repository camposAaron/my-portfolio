import { ref } from 'vue'

// The résumé lives in a private S3 bucket. This endpoint returns a pre-signed URL that is
// valid for 10 minutes, as a JSON string with a text/plain content type (so $fetch hands
// back a string and it is parsed here).
const RESUME_ENDPOINT = 'https://gshsimj431.execute-api.us-east-1.amazonaws.com/default/get-resume'

const loading = ref(false)
const failed = ref(false)

export function useResume() {
  async function openResume() {
    if (loading.value) return
    loading.value = true
    failed.value = false
    try {
      const response = await $fetch<string>(RESUME_ENDPOINT)
      const data = typeof response === 'string' ? JSON.parse(response) : response
      const resumeUrl = data.resumeUrl
      if (!resumeUrl) throw new Error('No resume URL in the response')

      const opened = window.open(resumeUrl, '_blank')
      // A blocked pop-up returns null: open it in this tab instead.
      if (opened) opened.opener = null
      else window.location.href = resumeUrl
    } catch (error) {
      console.error('Error fetching resume:', error)
      failed.value = true
    } finally {
      loading.value = false
    }
  }

  return { openResume, loading, failed }
}
