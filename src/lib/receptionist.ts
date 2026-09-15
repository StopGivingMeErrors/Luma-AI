export function openReceptionist() {
  window.dispatchEvent(new CustomEvent('luma:open-receptionist'))
}

export async function requestMicrophoneAccess(): Promise<{
  ok: boolean
  message?: string
}> {
  if (!navigator.mediaDevices?.getUserMedia) {
    return {
      ok: false,
      message:
        'Mic not found — check your microphone and try again, or book a free consultation.',
    }
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    stream.getTracks().forEach((t) => t.stop())
    return { ok: true }
  } catch {
    return {
      ok: false,
      message:
        'Mic not found — check your microphone and try again, or book a free consultation.',
    }
  }
}
